import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { VerifiedCallback } from 'passport-jwt';

import authConfig from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: authConfig.providers.linkedin.clientID,
      clientSecret: authConfig.providers.linkedin.clientSecret,
      callbackURL: authConfig.providers.linkedin.callbackURL,
      passReqToCallback: true,
      scope: ['r_emailaddress', 'r_liteprofile', 'r_basicprofile'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`LinkedIn UserProfile`, 'Auth');
      const jsonProfile = profile && profile._json || {};
      const userProfile = {
        userId: jsonProfile.id,
        linkedin: jsonProfile.id,
        username: jsonProfile.userName,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        picture: profile.pictureUrl || profile.photos[0].value,
      };

      // console.log('userProfile::', profile)
      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.LINKEDIN);
      done(null, { ...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt });
    } catch (err) {
      done(err, false);
    }
  }
}
