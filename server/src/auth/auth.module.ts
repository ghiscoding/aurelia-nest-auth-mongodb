import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FacebookService } from './services/facebook.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { LinkedInStrategy } from './strategies/linkedin.strategy';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { UserService } from './services/user.service';
import { WindowsliveService } from './services/windowslive.service';
import { WindowsliveStrategy } from './strategies/windowslive.strategy';

import authConfig from './auth-config.development';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSchema } from './schemas';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: authConfig.jwtSecretKey,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    FacebookStrategy,
    FacebookService,
    GithubStrategy,
    GoogleStrategy,
    JwtStrategy,
    LocalStrategy,
    LinkedInStrategy,
    MicrosoftStrategy,
    TwitterStrategy,
    UserService,
    WindowsliveStrategy,
    WindowsliveService,
  ],
  exports: [
    AuthService,
    UserService,
    WindowsliveService,
  ],
})
export class AuthModule { }
