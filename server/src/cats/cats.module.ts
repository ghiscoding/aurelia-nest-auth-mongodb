import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsResolver } from './cats.resolver';
import { CatSchema } from './schemas/cats.schema';
import { CatsService } from './services/cats.service';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';
import { OwnersService } from './services/owners.service';
import { UserSchema } from '../shared/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Cat', schema: CatSchema },
    { name: 'User', schema: UserSchema },
  ])],
  providers: [CatsResolver, CatsService, GraphqlPassportAuthGuard, OwnersService],
})
export class CatsModule { }
