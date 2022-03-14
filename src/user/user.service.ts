import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel("User") private readonly userModel: Model<User>,) { }

  async create(doc: User) {
    const result = await new this.userModel(doc).save();
    return result.id;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ username: email });
  }

  async validateUser(_user: User): Promise<any> {
    const user = await this.userModel.findOne({ username: _user.username });

    return new Promise((resolve, reject) => {
      if (user && user.password === _user.password) {
        const { password, ...result } = user.toObject();
        resolve(result);
      }
      else {
        reject(new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED));
      }
    })
  }

  async login(user: any): Promise<any> {
    const validUser = await this.validateUser(user).then(validuser => {
      const payload = { username: validuser.username, sub: validuser.id };
      return this.jwtService.sign(payload);
    }, err => {
      throw new HttpException("Usuario o senha errados", HttpStatus.UNAUTHORIZED);
    })
    return validUser;
  }

  async update(user: User) { }

  async remove(user: User) { }
}
