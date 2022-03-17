import mongoose from "mongoose";
import { ObjectID } from "typeorm";

export default class RoutinesModel { }

export const routineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    action: { type: Number, required: true },
    days: [{ type: Number, required: true }],
    timer: [{ type: Object, required: true }],
    ars: [{ type: String, required: true }],
    state: { type: Number, required: true },
    timeTurnOff: { type: Date, required: true },
});

export const lastRoutine = new mongoose.Schema({
    idRoutine: { type: String, required: true },
});

export interface lastRoutines {
    uid: string;
}

export interface routines {
    name: string;
    action: Number;
    days: any[];
    timer: [{
        hour: number;
        minute: number;
    }];
    ars: Array<string>;
    state: Number;
    timeTurnOff: Date,
    _id: mongoose.Types.ObjectId;
}