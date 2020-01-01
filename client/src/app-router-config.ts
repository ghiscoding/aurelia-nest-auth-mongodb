import { autoinject, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { AuthorizeStep } from 'shared/services/authorize-step';

@autoinject()
export default class {

  constructor(private router: Router) { }

  configure() {
    let appRouterConfig: any = function (config: RouterConfiguration): void {
      config.title = 'Aurelia';
      config.options.pushState = true;
      config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

      config.map([
        { route: ['', 'welcome'], name: 'welcome', moduleId: PLATFORM.moduleName('./welcome'), nav: true, title: 'Welcome' },
        { route: 'login/success/:token', name: 'loginSuccess', moduleId: PLATFORM.moduleName('./auth/login'), nav: false, title: 'Login' },
        { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./auth/login'), nav: false, title: 'Login' },
        { route: 'logout', name: 'logout', moduleId: PLATFORM.moduleName('./auth/logout'), nav: false, title: 'Logout' },
        { route: 'profile', name: 'profile', moduleId: PLATFORM.moduleName('./auth/profile'), nav: false, title: 'Profile' },
        { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('./auth/signup'), nav: false, title: 'Signup' },
        { route: 'contacts', name: 'contacts', moduleId: PLATFORM.moduleName('./contacts/index'), nav: true, title: 'Contacts', auth: true },
        { route: 'cats', name: 'cats', moduleId: PLATFORM.moduleName('./cats/cats-list'), nav: true, title: 'Cats', auth: true },
        { route: 'users', name: 'users', moduleId: PLATFORM.moduleName('./users/users-list'), nav: true, title: 'Users', auth: true, admin: true },
      ]);
    };

    this.router.configure(appRouterConfig);
  }
}
