import { Model } from 'mongoose';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './models/cat.interface';
import { CatInput } from './inputs/cat-input';
import { AuthGuard } from '@nestjs/passport';
import { User } from './models';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) { }

  async create(createCatDto: CatInput, currentUser: User): Promise<Cat> {
    const newCat = { ...createCatDto, ownerId: currentUser.userId };
    const createdCat = new this.catModel(newCat);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
