import * as mongoose from 'mongoose';

export class UserModel {}

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  export interface User {
    username: string;
    password: string;
  }