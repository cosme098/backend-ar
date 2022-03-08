import mongoose from "mongoose";

export default class RoutinesModel { }

export const routineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Date, required: true },
    acs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ac" }],
});

export interface routines {
    name: string;
    time: Date;
    acs: mongoose.Types.ObjectId[];
    _id?: mongoose.Types.ObjectId;
}