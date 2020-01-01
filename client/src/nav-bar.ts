import { autoinject, bindable, BindingEngine } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from './shared/services/auth.service';

@autoinject()
export class NavBar {
  @bindable router: Router;
  _isAuthenticated = false;
  isAdmin = false;
  displayName: string = '';
  subscription: { dispose: () => void };

  constructor(private bindingEngine: BindingEngine, private authService: AuthService) {
    this._isAuthenticated = this.authService.isAuthenticated();
    this.subscription = this.bindingEngine.propertyObserver(this, 'isAuthenticated')
      .subscribe((newValue, oldValue) => {
        if (this.isAuthenticated) {
          this.authService.getMe().then(data => {
            localStorage.setItem('userProfile', JSON.stringify(data));
            return this.displayName = data.displayName;
          });
        }
      });
  }

  get isAuthenticated(): boolean {
    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      let profile = localStorage.getItem('userProfile');
      const userProfile = (typeof profile === 'string') ? JSON.parse(profile) : {};
      if (userProfile.roles) {
        this.isAdmin = userProfile.roles.findIndex((role: string) => role.toUpperCase() === 'ADMIN') >= 0;
      } else {
        this.isAdmin = false;
      }
      this.displayName = userProfile.displayName;
    }
    return isLoggedIn;
  }

  deactivate() {
    this.subscription.dispose();
  }
}
