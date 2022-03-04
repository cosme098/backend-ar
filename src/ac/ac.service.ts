import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ac} from './ac.model';

@Injectable()
export class AcService {
    constructor(
      @InjectModel("Ac") private readonly userModel:Model<Ac>,) {}
      
  async findAll(id: string) {
      return await this.userModel.find({id: id});
  }

  async create(Ac: Ac) {
    const result = await new this.userModel(Ac).save();
    return result.id;
  }

  async update(id: any, Ac: Ac) {
    return await this.userModel.findByIdAndUpdate(id, Ac);
  }

  async delete(id: any) {
    return await this.userModel.findByIdAndRemove(id);
 }
}
