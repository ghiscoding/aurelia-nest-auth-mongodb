import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';

import { Cat } from '../models/cat.interface';
import { CatInput } from '../inputs/cat-input';
import { User } from '../../shared/models';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) { }

  async create(createCat: CatInput, currentUser: User): Promise<Cat> {
    const newCat = { ...createCat, ownerId: currentUser.userId };
    const createdCat = new this.catModel(newCat);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOneById(id: number): Promise<User> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException('Could not find cat.');
    }
    return cat;
  }
}
