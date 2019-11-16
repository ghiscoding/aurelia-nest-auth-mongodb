import { OAuth2 } from 'oauth';

import authConfig from '../auth-config.development';
import { rejects } from 'assert';

export class FacebookService {
  oauth;

  constructor() {
    this.oauth = new OAuth2(
      authConfig.providers.facebook.clientID,
      authConfig.providers.facebook.clientSecret,
      'https://graph.facebook.com',
      null,
      'oauth2/token',
      null);
  }

  getImage(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        'https://graph.facebook.com/v4.0/me/picture?redirect=false&type=large',
        token,
        (err, results, res) => {
          if (err) {
            reject(err);
          }
          const result = JSON.parse(results || {});
          const data = result && result.data || {};
          resolve(data);
        },
      );
    });
  }
}
