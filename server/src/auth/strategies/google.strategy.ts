import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';

import authConfig from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: authConfig.providers.google.clientID,
      clientSecret: authConfig.providers.google.clientSecret,
      callbackURL: authConfig.providers.google.callbackURL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`Google UserProfile`, 'Auth');
      const jsonProfile = profile && profile._json || {};

      const userProfile = {
        userId: jsonProfile.sub,
        google: jsonProfile.sub,
        username: jsonProfile.userName,
        email: jsonProfile.email,
        displayName: profile.displayName,
        picture: jsonProfile.picture.replace('sz=50', 'sz=200'),
      };

      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.GOOGLE);
      done(null, { ...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt });
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
