import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ac } from './ac.model';
import { MqttServices } from 'src/mqtt/mqtt.service';
@Injectable()
export class AcService {
  constructor(
    private readonly mqtt: MqttServices,
    @InjectModel("Ac") private readonly AcModel: Model<Ac>) { }

  StructureAc: Ac = {
    name: "",
    mac: "",
    status: true,
    localization: "",
    protocol: "",
    model: "1",
    power: 0,
    mode: "kCool",
    degress: 0,
    fanspeed: "kMedium",
    swingv: "kAuto",
    swingh: "off",
    quiet: 0,
    turbo: 1,
    econo: 0,
    light: "true",
    beep: 1,
    filter: 0,
    clean: 0,
    sleep: 0,
    updateAt: new Date(),
  }


  async find(id: string) {
    return await this.AcModel.find({ id: id });
  }
  async findAll() {
    return await this.AcModel.find();
  }
  async findByMac(mac: string) {
    return await this.AcModel.findOne({ mac: mac });
  }

  async create(Ac: Ac) {
    this.StructureAc.name = Ac.name;
    this.StructureAc.mac = Ac.mac;
    this.StructureAc.localization = Ac.localization;
    this.StructureAc.protocol = Ac.protocol;
    this.StructureAc.power = Ac.power;
    this.StructureAc.degress = Ac.degress;
    this.StructureAc.updateAt = new Date();

    const result = await new this.AcModel(this.StructureAc).save();
    this.mqtt.publishInTopic('mqtt/brisanet/' + this.StructureAc.mac, this.StructureAc);
    return result.id;
  }

  async update(id: any, Ac: Ac) {
    this.StructureAc.name = Ac.name;
    this.StructureAc.mac = Ac.mac;
    this.StructureAc.localization = Ac.localization;
    this.StructureAc.protocol = Ac.protocol;
    this.StructureAc.power = Ac.power;
    this.StructureAc.status = Ac.status;
    this.StructureAc.degress = Ac.degress;
    this.StructureAc.updateAt = new Date();
    console.log(this.StructureAc);

    this.mqtt.publishInTopic('mqtt/brisanet/' + Ac.mac, this.StructureAc).then(() => {
      // console.log('publicando no topico: mqtt/brisanet/' + Ac.mac);
      // console.log(this.StructureAc);
    });
    return await this.AcModel.findByIdAndUpdate(id, this.StructureAc);
  }

  async onlyUpdate(id: any, Ac: Ac) {
    this.StructureAc.name = Ac.name;
    this.StructureAc.mac = Ac.mac;
    this.StructureAc.localization = Ac.localization;
    this.StructureAc.protocol = Ac.protocol;
    this.StructureAc.power = Ac.power;
    this.StructureAc.degress = Ac.degress;
    this.StructureAc.updateAt = new Date();

    await this.AcModel.findByIdAndUpdate(id, this.StructureAc);
  }

  async delete(id: any) {
    return await this.AcModel.findByIdAndRemove(id);
  }
}
