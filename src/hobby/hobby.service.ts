import { PaginateHobby } from './dto/paginate.hobby';
import { PaginateInput } from './input/paginate';
import { Hobby } from './interface/hobby';
import { HobbyInput } from './input/hobby';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateModel } from 'mongoose';

@Injectable()
export class HobbyService {
  constructor(@InjectModel('hobbies') private readonly hobbyModel: PaginateModel<Hobby>) { }
  async create(createHobby: HobbyInput): Promise<Hobby> {
    const createdCat = new this.hobbyModel(createHobby);
    return await createdCat.save();
  }
  async findAll(paginate: PaginateInput): Promise<PaginateHobby>{
    const results = await this.hobbyModel.paginate({}, paginate);
    return { hobbies:results.docs, total: results.total, limit: results.limit, page: results.page, pages: results.pages };
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
