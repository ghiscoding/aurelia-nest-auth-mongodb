import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Globals } from '../shared/globals';

@autoinject()
export class AuthDataService {
  constructor(protected http: HttpClient) {
    this.http = http;
  }

  login(username: string, password: string) {
    return this.http.fetch(`${Globals.baseUrl}/auth/login`, {
      method: 'post',
      body: json({ username, password })
    }).then(response => response.json());
  }

  signup(email: string, password: string, displayName: string) {
    return this.http.fetch(`${Globals.baseUrl}/auth/signup`, {
      method: 'post',
      body: json({ email, password, displayName })
    }).then(response => response.json());
  }

  usernameAvailable(email: string): Promise<boolean> {
    return this.http.fetch(`${Globals.baseUrl}/auth/username-available`, {
      method: 'post',
      body: json({ email })
    }).then(response => response.json());
  }
}
