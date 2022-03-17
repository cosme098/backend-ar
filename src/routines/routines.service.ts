import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { lastRoutines, routines } from './routines.model';
import { Model } from 'mongoose';
import { scheduleJob, cancelJob, rescheduleJob } from 'node-schedule';
import { AcService } from 'src/ac/ac.service';
import { MqttServices } from '../mqtt/mqtt.service';
@Injectable()
export class RoutinesService {
    constructor(@InjectModel("Routines") private readonly routineData: Model<routines>,
        @InjectModel("lastRoutines") private readonly lastRoutine: Model<lastRoutines>,
        private readonly Ac: AcService,
        private readonly mqtt: MqttServices) { }

    async getRoutines(): Promise<routines[]> {
        return await this.routineData.find().exec();
    }
    async findRoutine(id): Promise<routines> {
        return await this.routineData.findById(id);
    }

    async createRoutine(data: routines): Promise<routines> {
        const date = new Date(data.timeTurnOff);
        const ars: Array<any> = [];
        const arsAll: Array<any> = await this.Ac.findAll();
        const newRoutine = new this.routineData(data);
        const idRoutine = await newRoutine.save();
        let currentArs: any
        this.lastRoutine.findByIdAndUpdate(data._id, { idRoutine: idRoutine._id.toString(), }, { upsert: true }).then((data) => {
        }, (err: any) => {
            this.lastRoutine.create({ name: idRoutine._id.toString() })
        });
        const newSchedule = scheduleJob(data.name, { hour: data.timer[0].hour, minute: data.timer[0].minute, dayOfWeek: data.days }, (timeSchedule) => {
            if (timeSchedule.getTime() < date.getTime() || (timeSchedule.getTime() == date.getTime() && timeSchedule.getMinutes() < date.getMinutes())) {
                data.ars.forEach((element: any) => {
                    currentArs = arsAll.find(x => x._id.toString() == element.toString())
                    ars.push(currentArs);
                    currentArs.degress = data.action;
                    currentArs.power = data.state;
                    console.log("rotina correndo normal", "mqtt/brisanet/" + currentArs.mac);
                    this.Ac.update(currentArs._id, currentArs);
                    this.mqtt.publishInTopic("mqtt/brisanet/" + currentArs.mac, data).then(() => {
                    });
                })
            }
        })
        return idRoutine;
    }

    async getLastRoutines(): Promise<lastRoutines[]> {
        return await this.lastRoutine.find().exec();
    }

    async updateRoutine(routine: routines): Promise<routines> {
        const date = new Date(routine.timeTurnOff);
        const routines: Array<any> = await this.getRoutines();
        const arsAll: Array<any> = await this.Ac.findAll();
        const ars: Array<any> = [];
        let routineUpdated = routines.find(x => x._id.toString() == routine._id.toString());

        cancelJob(routineUpdated.name);
        routineUpdated = null;

        const updateSchedule = scheduleJob(routine.name, { hour: routine.timer[0].hour, minute: routine.timer[0].minute, dayOfWeek: routine.days }, (timeSchedule) => {
            if (timeSchedule.getTime() < date.getTime() || (timeSchedule.getTime() == date.getTime() && timeSchedule.getMinutes() < date.getMinutes())) {
                routine.ars.forEach((element: any) => {
                    ars.push(arsAll.find(x => x._id.toString() == element.toString()));
                })
                ars.forEach(ac => {
                    ac.degress = routine.action;
                    ac.power = routine.state;
                    console.log("rotina correndo", "mqtt/brisanet/" + ac.mac);
                    this.mqtt.publishInTopic("mqtt/brisanet/" + ac.mac, ac).then(() => {
                    });
                })
            }
        });

        return await this.routineData.findByIdAndUpdate(routine._id, routine);
    }

    async deleteRoutine(id, name): Promise<void> {
        const removeSchedule = cancelJob(name);
        return await this.routineData.findByIdAndRemove(id);
    }
}
