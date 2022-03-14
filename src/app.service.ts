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
        const arsAll: Array<any> = await this.Ac.findAll();
        await this.routines.getRoutines().then((routines: any) => {
            schedules.push(...routines);
        })

        schedules.forEach(data => {
            scheduleJob(data.name, { hour: data.timer[0].hour, minute: data.timer[0].minute, dayOfWeek: data.days }, () => {
                data.ars.forEach((element: any) => {
                    ars.push(arsAll.find(x => x._id.toString() == element.toString()));
                })
                ars.forEach(ac => {
                    console.log(ac);

                    ac.degress = data.action;
                    ac.power = data.state;
                    console.log("rotina correndo normal", "mqtt/brisanet/" + ac.mac);
                    this.mqtt.publishInTopic("mqtt/brisanet/" + ac.mac, ac).then(() => {
                    });
                })
                ars.splice(0, ars.length);
            })
        })
    }
}