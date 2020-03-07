import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { VerifiedCallback } from 'passport-jwt';

import authConfig from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';
import { FacebookService } from '../services/facebook.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService, private facebookService: FacebookService) {
    super({
      clientID: authConfig.providers.facebook.clientID,
      clientSecret: authConfig.providers.facebook.clientSecret,
      callbackURL: authConfig.providers.facebook.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      passReqToCallback: true,
      scope: ['email'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`Facebook UserProfile`, 'Auth');
      // get larger image from Facebook Graph API
      const image = await this.facebookService.getImage(accessToken);

      const jsonProfile = profile && profile._json || {};

      const userProfile = {
        userId: profile.id || jsonProfile.id,
        facebook: profile.id || jsonProfile.id,
        username: profile.userName || jsonProfile.userName,
        email: profile.email || jsonProfile.email,
        displayName: profile.displayName,
        picture: image && image.url || profile.photos[0].value,
      };

      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.FACEBOOK);
      done(null, { ...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt });
    } catch (err) {
      done(err, false);
    }
  }
}
