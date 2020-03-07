import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-windowslive';
import { VerifiedCallback } from 'passport-jwt';

import authConfig from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';
import { WindowsliveService } from '../services/windowslive.service';

@Injectable()
export class WindowsliveStrategy extends PassportStrategy(Strategy, 'windowslive') {
  constructor(private readonly authService: AuthService, private windowsliveService: WindowsliveService) {
    super({
      clientID: authConfig.providers.windowslive.clientID,
      clientSecret: authConfig.providers.windowslive.clientSecret,
      callbackURL: authConfig.providers.windowslive.callbackURL,
      passReqToCallback: true,
      scope: ['wl.signin', 'wl.basic', 'wl.emails', 'user.read'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`WindowsLive UserProfile`, 'Auth');
      // get larger image from Microsoft Graph API
      // const image = await this.windowsliveService.getImage(accessToken);

      const jsonProfile = profile && profile._json || {};

      const userProfile = {
        userId: jsonProfile.id,
        windowslive: jsonProfile.id,
        username: jsonProfile.userName,
        email: jsonProfile.emails.account,
        displayName: jsonProfile.name,
        picture: null, // profile.photos[0].value, <-- no longer valid, we now have to use MS Graph API
      };
      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.WINDOWS_LIVE);
      done(null, { ...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt });
    } catch (err) {
      done(err, false);
    }
  }
}
