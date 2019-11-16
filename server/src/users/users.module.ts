import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersResolver, UsersService, GraphqlPassportAuthGuard],
})
export class UsersModule { }
