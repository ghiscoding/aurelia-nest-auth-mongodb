import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './shared/common.module';

@Module({
  imports: [
    AuthModule,
    CatsModule,
    // CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_DEV === 'dev' ? '.env.dev' : '.env.prod',
      // ignoreEnvFile: process.env.NODE_DEV === 'prod'
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
