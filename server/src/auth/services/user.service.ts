import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { decode } from 'jsonwebtoken';

import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) { }

  async create(newUser: User): Promise<User> {
    // const createdUser = new this.userModel(newUser);
    const objectId = Types.ObjectId();
    const userId = newUser.userId || objectId.toString(); // copy over the same _id when userId isn't provided (by local signup users)
    const createdUser = new this.userModel({ ...newUser, _id: objectId, userId });
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async findOne(userProperty): Promise<User> {
    return await this.userModel.findOne(userProperty).exec();
  }

  async link(userId: string, token: string) {
    let result;
    const decodedToken = decode(token) as User;
    const user = await this.userModel.findOne({ userId });
    const provider = decodedToken && decodedToken.provider;
    console.log('token is::', token, ' user::', user, ' - provider::', provider, ' - providerId::', decodedToken[provider])
    if (user && decodedToken && provider) {
      user[provider] = decodedToken[provider];
      result = await user.save();
      console.log('updatedUser::', result)
    }
    return result;
  }

  // async updateMe(updatedUser: User) {
  //   const user = await this.findOne({ userId: updatedUser.userId });
  //   user.displayName = updatedUser.displayName;
  //   user.email = updatedUser.email;
  // }
}