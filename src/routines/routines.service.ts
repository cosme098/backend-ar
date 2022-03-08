import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { routines } from './routines.model';
import { Model } from 'mongoose';
import { scheduleJob, cancelJob } from 'node-schedule';
import { appendFileSync } from 'fs';

@Injectable()
export class RoutinesService {
    constructor(@InjectModel("Routines") private readonly routineData: Model<routines>,) { }

    async getRoutines(): Promise<routines[]> {
        return await this.routineData.find().exec();
    }

    createRoutine(): any {

        const newSchedule = scheduleJob("teste", { hour: 16, minute: [10, 11, 12, 13, 14, 15], dayOfWeek: [0, 1, 2, 3, 4, 5, 6] }, () => {
            console.log("Routine is running");
        })

        // const newRoutine = new this.routineData(routine);
        // return await newRoutine.save();
    }

    async updateRoutine(routine: routines): Promise<routines> {
        return await this.routineData.findByIdAndUpdate(routine._id, routine);
    }

    deleteRoutine(): void {
        const removeSchedule = cancelJob("teste");
        console.log(removeSchedule);
        // return await this.routineData.findByIdAndRemove(id);
    }
}
