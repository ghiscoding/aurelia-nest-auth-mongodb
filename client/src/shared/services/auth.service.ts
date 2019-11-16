import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import authConfig from '../../auth/auth-config.development';
import { AuthenticationService } from './authentication.service';

@autoinject()
export class AuthService {
  constructor(private authenticationService: AuthenticationService, private http: HttpClient, private router: Router) { }

  authenticate() {

  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  /** Get current user info */
  getMe(): Promise<any> {
    return this.http.fetch(authConfig.profileEndpoint).then(this.status);
  }

  /** Get current user info using the GraphQL WhoAmI query */
  getWhoAmI(): Promise<any> {
    return this.http.fetch(`http://localhost:3000/graphql`, {
      method: 'post',
      body: json({ query: `query { whoAmI { userId, displayName, email }}` })
    }).then(response => response.json());
  }

  logout(navigateUrl: string) {
    return new Promise((resolve) => {
      window.localStorage.removeItem(authConfig.tokenName);
      this.router.navigateToRoute(navigateUrl);
      resolve(true);
    });
  }

  status(response) {
    if (response.status >= 200 && response.status < 400) {
      return response.json().catch(error => null);
    } else if (response.status === 401) {
      throw new Error(`401 (Unauthorized)`);
    }
    throw response;
  }

  /** Link a new Provider to the Current Users */
  link(provider: string, token: string): Promise<any> {
    return this.http.fetch(`${authConfig.baseUrl}/link/${provider}`, {
      method: 'post',
      body: json({ token })
    })
      .then((res) => json(res));
  }

  /** Unlink a Provider to the Current Users */
  unlink(provider: { id: string, name: string }): Promise<any> {
    return this.http.fetch(`${authConfig.baseUrl}/link/${provider.name}/${provider.id}`)
      .then((res) => console.log(res));
  }
}
