import { autoinject, bindable, BindingEngine } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from './shared/services/auth.service';

@autoinject()
export class NavBar {
  @bindable router: Router;
  _isAuthenticated: boolean = false;
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
      let userProfile = localStorage.getItem('userProfile');
      this.displayName = (typeof userProfile === 'string') ? JSON.parse(userProfile).displayName : '';
    }
    return isLoggedIn;
  }

  deactivate() {
    this.subscription.dispose();
  }
}
