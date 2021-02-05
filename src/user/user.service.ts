import { JWTService } from './jwt/JWTToken';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from './input/user';
import { User } from './interface/user';
import *  as bcrypt from 'bcrypt';
var path = require('path');
import { createWriteStream } from 'fs';
@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>, private readonly jwtService: JWTService) { }
  async create(createUser: UserInput): Promise<User> {
    let url = "";
    if (createUser.avatar) {
      const { filename, createReadStream } = await createUser.avatar;
      const fileEXT = path.extname(filename);
      const stream = await createReadStream().pipe(createWriteStream(`./public/products/${Date.now() + fileEXT}`));
      url = stream.path.toString().replace('./public/', '');
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 11);
    const createdUser = new this.userModel({ ...createUser, password: hashedPassword, avatar: url ?? "" });
    const user = await createdUser.save().then(newUser => newUser.populate('hobbies').execPopulate());
    const dataToken = {
      id: user.id,
      email: user.email,
    };
    user.access_token = await this.jwtService.generateAccessToken(dataToken);
    return user;
  }
  async login(createUser: UserInput): Promise<User> {
    const user = await this.userModel.findOne({ email: createUser.email });
    const isPasswordMatching = await bcrypt.compare(
      createUser.password,
      user.password
    );
    if (!isPasswordMatching) {
      throw new Error('Login fail');
    }
    user.password = undefined;
    const dataToken = {
      id: user.id,
      email: user.email,
    };
    user.access_token = await this.jwtService.generateAccessToken(dataToken);
    return user;
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find().populate('hobbies').sort({ createdAt: -1 }).exec();
  }
  async remove(id: string): Promise<Boolean> {
    await (await this.userModel.findById(id)).delete();
    return true;
  }
  async update(updateUser: UserInput): Promise<User> {
    const { id, name, email, password } = updateUser;
    const category = await this.userModel.findById(id);
    const hashedPassword = await bcrypt.hash(password, 11);
    if (name)
      category.name = name;
    if (email)
      category.email = email;
    if (password)
      category.password = hashedPassword;
    return category.save().then(newUser => newUser.populate('hobbies').execPopulate());
  }

}
