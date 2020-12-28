import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';

import { Cat } from '../models/cat.interface';
import { CatInput } from '../graphql/inputs/cat-input';
import { User, Direction } from '../../shared/models';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) { }

  async create(createCat: CatInput, currentUser: User): Promise<Cat> {
    const newCat = { ...createCat, ownerId: currentUser.userId };
    const createdCat = new this.catModel(newCat);
    return await createdCat.save();
  }

  async query(queryArgs: { orderBy?: Array<{ field: string; direction: Direction; }> }): Promise<Cat[]> {
    let modelFind = this.catModel.find();
    // [['name', 'asc']]
    if (queryArgs && Array.isArray(queryArgs.orderBy)) {
      const sort = [];
      queryArgs.orderBy.forEach(sorter => sort.push([sorter.field, sorter.direction]));
      modelFind = modelFind.sort(sort);
    }
    const result = await modelFind.exec();
    console.log('result', result);
    return result;
  }

  async findOneById(id: number): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException('Could not find cat.');
    }
    return cat;
  }
}
