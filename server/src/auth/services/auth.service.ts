import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../auth-config.development';
import { UserService } from './user.service';
import { User } from '../models';
import { UserSignupDto } from '../dto';
import e = require('express');

export enum Provider {
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
  MICROSOFT = 'microsoft',
  TWITTER = 'twitter',
  WINDOWS_LIVE = 'windowslive',
}

@Injectable()
export class AuthService {

  private readonly JWT_SECRET_KEY = authConfig.jwtSecretKey;

  constructor(private jwtService: JwtService, private userService: UserService) { }

  async validateOAuthLogin(userProfile: any, provider: Provider): Promise<{ jwt: string; user: User }> {
    try {
      // find user in MongoDB and if not found then create it in the DB
      let existingUser = await this.userService.findOne({ [provider]: userProfile.userId });
      if (!existingUser) {
        existingUser = await this.userService.create({ ...userProfile, provider, providers: [{ providerId: userProfile.userId, name: provider }] });
      }

      const { userId, email, displayName, picture, providers, roles } = existingUser;
      const signingPayload = { userId, email, displayName, picture, providers, roles };
      const jwt: string = sign(signingPayload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      return { jwt, user: existingUser };
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne({ email });
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ token: string }> {
    const { email, displayName, userId, roles } = user;
    return { token: this.jwtService.sign({ email, displayName, userId, roles }) };
  }

  async signup(signupUser: UserSignupDto): Promise<{ token: string }> {
    const password = await bcrypt.hash(signupUser.password, 10);
    const createdUser = await this.userService.create({ ...signupUser, password });
    const { email, displayName, userId } = createdUser;
    return { token: this.jwtService.sign({ email, displayName, userId }) };
  }

  async usernameAvailable(user: Partial<User>): Promise<boolean> {
    if (!user || !user.email) {
      return false;
    }
    const userFound = await this.userService.findOne({ email: user.email });
    return !userFound;
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
