import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ac } from './ac.model';

@Injectable()
export class AcService {

  StructureAc: Ac = {
    name: "",
    mac: "",
    localization: "",
    protocol: "",
    model: "1",
    power: 0,
    mode: "cool",
    degress: 0,
    fanspeed: "auto",
    swingv: "swingv",
    swingh: "off",
    quiet: 0,
    turbo: 0,
    econo: 0,
    light: 1,
    beep: 1,
    filter: 0,
    clean: 0,
    sleep: 0,
  }

  constructor(
    @InjectModel("Ac") private readonly AcModel: Model<Ac>,) { }

  async findAll(id: string) {
    return await this.AcModel.find({ id: id });
  }

  async create(Ac: Ac) {
    this.StructureAc.name = Ac.name;
    this.StructureAc.mac = Ac.mac;
    this.StructureAc.localization = Ac.localization;
    this.StructureAc.protocol = Ac.protocol;
    this.StructureAc.power = Ac.power;
    this.StructureAc.degress = Ac.degress;
    const result = await new this.AcModel(this.StructureAc).save();
    return result.id;
  }

  async update(id: any, Ac: Ac) {
    this.StructureAc.name = Ac.name;
    this.StructureAc.mac = Ac.mac;
    this.StructureAc.localization = Ac.localization;
    this.StructureAc.protocol = Ac.protocol;
    this.StructureAc.power = Ac.power;
    this.StructureAc.degress = Ac.degress;
    return await this.AcModel.findByIdAndUpdate(id, this.StructureAc);
  }

  async delete(id: any) {
    return await this.AcModel.findByIdAndRemove(id);
  }
}
