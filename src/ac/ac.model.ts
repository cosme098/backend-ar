import * as mongoose from 'mongoose';

export class AcModel { }

export const AcSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mac: { type: String, required: true },
  status: { type: Boolean, required: true },
  localization: { type: String, required: true },
  protocol: { type: String, required: true },
  model: { type: String, required: true },
  power: { type: Number, required: true },
  mode: { type: String, required: true },
  degress: { type: Number, required: true },
  fanspeed: { type: String, required: true },
  swingv: { type: String, required: true },
  swingh: { type: String, required: true },
  quiet: { type: Number, required: true },
  turbo: { type: Number, required: true },
  econo: { type: Number, required: true },
  light: { type: String, required: true },
  beep: { type: Number, required: true },
  filter: { type: Number, required: true },
  clean: { type: Number, required: true },
  sleep: { type: Number, required: true },
  updateAt: { type: Date, required: true },
});

export interface Ac {
  name: String
  mac: String
  status: Boolean
  localization: String
  protocol: String
  model: String
  power: Number
  mode: String
  degress: Number
  fanspeed: String
  swingv: string
  swingh: string
  quiet: Number
  turbo: Number
  econo: Number
  light: string
  beep: Number
  filter: Number
  clean: Number
  sleep: Number
  updateAt: Date
}
