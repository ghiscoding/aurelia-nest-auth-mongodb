import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { AuthInterceptor } from 'auth-interceptor';
import AppRouterConfig from './app-router-config';
import { FetchConfigService } from 'shared/services/fetch-config.service';

@autoinject()
export class App {
  httpProcessing = false;
  router: Router;

  constructor(
    private appRouterConfig: AppRouterConfig,
    private authInterceptor: AuthInterceptor,
    private ea: EventAggregator,
    private http: HttpClient,
    private fetchConfig: FetchConfigService,
    router: Router, // required by configure sub-services
  ) {
    this.ea.subscribe('http:started', () => this.httpProcessing = true);
    this.ea.subscribe('http:stopped', () => this.httpProcessing = false);
    this.http.configure(config => config.withInterceptor(this.authInterceptor));
    this.router = router;
  }

  activate() {
    this.appRouterConfig.configure();
    this.fetchConfig.configure();
  }
}
