import { PaginateInput } from './input/paginate';
import { Hobby } from './interface/hobby';
import { HobbyInput } from './input/hobby';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HobbyService {
  constructor(@InjectModel('hobbies') private readonly hobbyModel: Model<Hobby>) { }
  async create(createHobby: HobbyInput): Promise<Hobby> {
    const createdCat = new this.hobbyModel(createHobby);
    return await createdCat.save();
  }
  async findAll(paginate: PaginateInput): Promise<Hobby[]> {
    const {
      skip,
      limit
    } = paginate;
    return await this.hobbyModel.find().limit(limit ? limit : 10)
    .skip(skip ? skip : 0).exec();
  }
  async remove(id: string): Promise<Boolean> {
    await (await this.hobbyModel.findById(id)).delete();
    return true;
  }
  async update(updateHobby: HobbyInput): Promise<Hobby> {
    const { id, name } = updateHobby;
    const category = await this.hobbyModel.findById(id);
    if (name)
      category.name = name;
    return await category.save();
  }
}
