import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';

import { User } from './models/user.interface';
import { UserQueryArgs } from './graphql/inputs/pagination.input';
import { getFilterByQuery } from '../shared/graphql/utils/utilities';


@Injectable()
@UseGuards(AuthGuard('jwt'))
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  stringToBase64 = (data: any): string => Buffer.from(data).toString('base64');
  base64ToString = (data: any): string => Buffer.from(data, 'base64').toString('ascii');

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUsers(userQueryArgs: UserQueryArgs): Promise<{ totalCount: number, nodes: User[], pageInfo?: { hasNextPage: boolean; endCursor: string; } }> {
    const { first = 1, offset = 0, filterBy, orderBy, cursor } = userQueryArgs;

    const findQuery = getFilterByQuery(filterBy) || {};
    if (cursor) {
      findQuery['_id'] = {
        $lt: this.base64ToString(cursor)
        // $lt: (cursor)
      };
    }
    let schema = this.userModel.find(findQuery);
    if (Array.isArray(orderBy)) {
      const sort = [];
      orderBy.forEach(sorter => sort.push([sorter.field, sorter.direction])); // [['name', 'asc']]
      schema = schema.sort(sort);
    }
    const query = schema.toConstructor();
    const totalCount = await schema.countDocuments().exec();
    let nodes = await new query().skip(offset).limit(first + 1).exec(); // add +1 to check if we have next page

    // let nodes = await query().limit(first + 1).exec(); // with cursor
    const hasNextPage = nodes.length > first;
    if (hasNextPage) {
      nodes = nodes.slice(0, -1); // remove unnecessary extra item pulled for hasNextPage check
    }
    return { totalCount, nodes, pageInfo: { hasNextPage, endCursor: hasNextPage ? this.stringToBase64(nodes[nodes.length - 1].id) : null } };
  }

  async getTotalUserCount(): Promise<number> {
    return await this.userModel.countDocuments().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
