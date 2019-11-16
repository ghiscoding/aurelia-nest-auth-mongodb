import { autoinject } from 'aurelia-framework';
import { AuthService } from '../shared/services/auth.service';

@autoinject()
export class Logout {
  constructor(private authService: AuthService) { }

  activate(): void {
    window.localStorage.removeItem('userProfile');
    this.authService.logout('login')
      .then(response => {
        console.log(`ok logged out on logout.js`);
      })
      .catch(err => {
        console.log(`error logged out logout.js => ${err}`);
      });
  }
}
