import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';
import { AuthenticationService } from './authentication.service';

@autoinject()
export class FetchConfigService {
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  configure() {
    this.httpClient.configure(httpConfig => {
      httpConfig.withInterceptor(this.authService.tokenInterceptor);
    });
  }
}
