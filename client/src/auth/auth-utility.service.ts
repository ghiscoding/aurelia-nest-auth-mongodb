import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import authConfig from './auth-config.development';

@autoinject()
export class AuthUtilityService {
  constructor(private router: Router) {
  }

  saveTokenAndRedirect(token: string) {
    window.localStorage.setItem(authConfig.tokenName, token);
    this.router.navigateToRoute(authConfig.loginRedirect);
  }
}
