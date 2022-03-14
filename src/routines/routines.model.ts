import mongoose from "mongoose";

export default class RoutinesModel { }

export const routineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    action: { type: Number, required: true },
    days: [{ type: Number, required: true }],
    timer: [{ type: Object, required: true }],
    ars: [{ type: String, required: true }],
    state: { type: Number, required: true },
});

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
    _id: mongoose.Types.ObjectId;
}