import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter-oauth2';
import { VerifiedCallback } from 'passport-jwt';

import authConfig from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: authConfig.providers.twitter.clientID,
      clientSecret: authConfig.providers.twitter.clientSecret,
      callbackURL: authConfig.providers.twitter.callbackURL,
      passReqToCallback: true,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`Twitter UserProfile`, 'Auth');
      const jsonProfile = profile && profile._json || {};
      console.log(profile);
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        twitter: profile.id || jsonProfile.id,
        username: profile.userName || jsonProfile.userName,
        email: profile.email || jsonProfile.email,
        displayName: profile.displayName,
        picture: null,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.TWITTER);
      done(null, { ...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt });
    } catch (err) {
      done(err, false);
    }
  }
}
