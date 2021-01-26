import { Hobby } from 'src/hobby/models/hobby';
import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  name: string;
  avatar:string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  hobbies:Array<Hobby>;
  access_token:string;
}