import { autoinject } from 'aurelia-framework';
import { Interceptor } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import authConfig from './auth/auth-config.development';

@autoinject()
export class AuthInterceptor implements Interceptor {
  constructor(private router: Router) { }

  request(message: Request) {
    let token = window.localStorage.getItem(authConfig.tokenName) || null;
    message?.headers?.append('Authorization', `Bearer ${token}`);
    return message;
  }

  requestError(error): Request | Response | Promise<Request | Response> {
    throw error;
  }

  response(message: Response) {
    if (message.status === 401) {
      this.router.navigateToRoute(authConfig.loginRoute);
    }
    return message;
  }

  responseError(error): Response | Promise<Response> {
    throw error;
  }
}
