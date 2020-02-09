import { Module } from '@nestjs/common';
import { DateScalar } from './graphql/scalars/date.scalar';

@Module({
  providers: [DateScalar],
})
export class CommonModule { }
