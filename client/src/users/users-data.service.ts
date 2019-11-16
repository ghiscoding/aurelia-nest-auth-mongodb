import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Globals } from '../shared/globals';

@autoinject()
export class UsersDataService {
  constructor(protected http: HttpClient) {
    this.http = http;
  }

  getAll<T>(): Promise<T> {
    return this.http.fetch(Globals.baseGraphQlUrl, {
      method: 'post',
      body: json({
        query: `query { users { userId, displayName, email, picture, facebook,
        google, github, linkedin, live, microsoft, windowslive, twitter }}` })
    }).then(response => response.json());
  }
}
