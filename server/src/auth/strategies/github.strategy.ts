import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';

import authConfig from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: authConfig.providers.github.clientID,
      clientSecret: authConfig.providers.github.clientSecret,
      callbackURL: authConfig.providers.github.callbackURL,
      passReqToCallback: true,
      scope: ['user:email'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`GitHub UserProfile`, 'Auth');
      const jsonProfile = profile && profile._json || {};
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        github: profile.id || jsonProfile.id,
        username: profile.login || jsonProfile.login,
        email: profile.email || Array.isArray(profile.emails) && profile.emails[0].value,
        displayName: profile.displayName || jsonProfile.displayName,
        picture: `${jsonProfile.avatar_url}&size=200`,
      };
      console.log('userProfile::', userProfile, ' - req::', req.headers)
      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.GITHUB);
      done(null, { ...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt });
    } catch (err) {
      done(err, false);
    }
  }
}
