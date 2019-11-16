import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsResolver } from './cats.resolver';
import { CatSchema } from './cats.schema';
import { CatsService } from './cats.service';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  providers: [CatsResolver, CatsService, GraphqlPassportAuthGuard],
})
export class CatsModule { }
