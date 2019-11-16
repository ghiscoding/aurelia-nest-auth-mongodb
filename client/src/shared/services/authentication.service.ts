import { autoinject } from 'aurelia-framework';
import { StorageService } from './storage.service';
import authConfig from '../../auth/auth-config.development';

@autoinject()
export class AuthenticationService {
  initialUrl: string;

  constructor(private storage: StorageService) { }

  getLoginRedirect() {
    return this.initialUrl || '/';
  }

  getLoginRoute() {
    return '/login';
  }

  getInitialUrl(url) {
    this.initialUrl = url;
  }

  setInitialUrl(url) {
    this.initialUrl = url;
  }

  isAuthenticated() {
    let token = this.storage.get(authConfig.tokenName);

    // There's no token, so user is not authenticated.
    if (!token) {
      return false;
    }

    // There is a token, but in a different format. Return true.
    if (token.split('.').length !== 3) {
      return true;
    }

    // make sure the token is not expired 
    let exp;
    try {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      exp = JSON.parse(window.atob(base64)).exp;
    } catch (error) {
      return false;
    }

    if (exp) {
      return Math.round(new Date().getTime() / 1000) <= exp;
    }

    return true;
  }

  get tokenInterceptor() {
    let config = {
      authHeader: 'Authorization',
      authToken: 'Bearer',
      httpInterceptor: true,
      tokenPrefix: '',
      tokenName: authConfig.tokenName,
    };
    let storage = this.storage;
    let auth = this;
    return {
      request(request) {
        if (auth.isAuthenticated() && config.httpInterceptor) {
          let tokenName = config.tokenPrefix ? `${config.tokenPrefix}_${config.tokenName}` : config.tokenName;
          let token = storage.get(tokenName);

          if (config.authHeader && config.authToken) {
            token = `${config.authToken} ${token}`;
          }

          request.headers.set(config.authHeader, token);
        }
        return request;
      }
    };
  }
}
