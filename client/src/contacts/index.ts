import {autoinject, PLATFORM} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {WebAPI} from './web-api';

@autoinject()
export class Index {
  api: WebAPI;
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Contacts';
    config.map([
      { route: '',            moduleId: PLATFORM.moduleName('./no-selection'),  name:'contact', title: 'Select'},
      { route: 'detail/:id',  moduleId: PLATFORM.moduleName('./contact-detail'), name:'detail' }
    ]);

    this.router = router;
  }

  onDeactivate(): void {
    this.api = null;
  }
  destroy(): void {
    this.api = null;
  }

}
