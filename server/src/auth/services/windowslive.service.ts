import { OAuth2 } from 'oauth';

import authConfig from '../auth-config.development';

export class WindowsliveService {
  oauth;

  constructor() {
    this.oauth = new OAuth2(
      authConfig.providers.windowslive.clientID,
      authConfig.providers.windowslive.clientSecret,
      'https://graph.microsoft.com',
      null,
      'oauth2/token',
      null);
  }

  getImage(token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        // 'https://graph.microsoft.com/v1.0/me/photo/$value',
        'https://graph.microsoft.com/beta/me/photo/$value',
        token,
        (err, results, res) => {
          if (err) {
            reject(err);
          }
          console.log('getImage result:', results, err, res)
          resolve(results);
          // results = JSON.parse(results);
        },
      );
    });
  }
}
