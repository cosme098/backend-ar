import * as mongoose from 'mongoose';

export class UserModel {}

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  export interface User {
    email: string;
    password: string;
  }