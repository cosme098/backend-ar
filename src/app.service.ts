import { Injectable } from '@nestjs/common';
import { AcService } from './ac/ac.service';
import { MqttServices } from './mqtt/mqtt.service';
import { RoutinesService } from './routines/routines.service';
import { scheduleJob, cancelJob, rescheduleJob } from 'node-schedule';
@Injectable()
export class AppService {

    constructor(private readonly Ac: AcService,
        private readonly mqtt: MqttServices,
        private readonly routines: RoutinesService) {

        this.startSchedules();
    }

    async startSchedules() {
        const schedules: Array<any> = [];
        const ars: Array<any> = [];
        let currentArs: any;
        const arsAll: Array<any> = await this.Ac.findAll();
        await this.routines.getRoutines().then((routines: any) => {
            schedules.push(...routines);
        })
        // synchronization last routines off
        scheduleJob('*/3 * * * *', (_values) => {
            schedules.forEach(async (element: any) => {
                this.routines.findRoutine(element._id).then((routine: any) => {
                    console.log(_values.getHours() >= routine?.timer[0]?.hour && _values.getMinutes() >= routine?.timer[0]?.minute && _values.getHours() < 23);
                    if (_values.getHours() >= routine?.timer[0]?.hour && _values.getMinutes() >= routine?.timer[0]?.minute && _values.getHours() < 23) {
                        console.log("chamando rotina", routine.name);
                        routine.ars.forEach(async (element: any) => {
                            currentArs = arsAll.find(x => x._id.toString() == element.toString())
                            currentArs.degress = routine.action;
                            currentArs.power = false;
                            await this.Ac.update(currentArs._id, currentArs);
                        })
                    }
                })
            })
        });

        // synchronization last routines on
        scheduleJob('*/29 * * * *', (values) => {
            console.log("de 35 em 35");
            arsAll.forEach(async ac => {
                ac.power = true;
                await this.Ac.onlyUpdate(ac._id, ac);
                await this.mqtt.publishInTopic('mqtt/brisanet/' + ac.mac, ac);
            });
        });

        arsAll.forEach(async ac => {
            this.mqtt.subscribeToTopic('mqtt/status/ac/' + ac.mac);
        })

        // for start all routines 
        schedules.forEach(data => {
            scheduleJob(data.name, { hour: data.timer[0].hour, minute: data.timer[0].minute, dayOfWeek: data.days }, (timeSchedule) => {
                data.ars.forEach((element: any) => {
                    ars.push(arsAll.find(x => x._id.toString() == element.toString()));
                })

                ars.forEach(async ac => {
                    ac.degress = data.action;
                    ac.power = data.state;
                    console.log("rotina correndo normal", "mqtt/brisanet/" + ac.mac);
                    await this.Ac.onlyUpdate(ac._id, ac);
                    await this.mqtt.publishInTopic('mqtt/brisanet/' + ac.mac, ac);
                })



                scheduleJob('*/30 * * * *', (values) => {
                    if (timeSchedule.getTime() > data.timer[0].hour && timeSchedule.getTime() < 23) {
                        ars.forEach(async (element: any) => {
                            currentArs = arsAll.find(x => x._id.toString() == element.toString())
                            if (currentArs.state == true) {
                                currentArs.degress = data.action;
                                currentArs.power = false;
                                console.log("rotina correndo normal", "mqtt/brisanet/" + currentArs.mac);
                                await this.Ac.update(currentArs._id, currentArs);
                            }
                        })
                    }
                });

                ars.splice(0, ars.length);
            })
        })
    }
}