import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

import { Globals } from '../shared/globals';

@autoinject()
export class UsersDataService {
  constructor(protected http: HttpClient) {
    this.http = http;
  }

  getUsers(query: string): Promise<any> {
    return new Promise(async resolve => {
      const response = await this.http.fetch(Globals.baseGraphQlUrl, {
        method: 'post',
        body: json({ query })
      });
      resolve(response.json());
    });
  }

  async getAll<T>(): Promise<T> {
    const response = await this.http.fetch(Globals.baseGraphQlUrl, {
      method: 'post',
      body: json({
        query: `query { users { userId, displayName, email, picture, roles,
          facebook, google, github, linkedin, live, microsoft, windowslive, twitter }}`
      })
    });
    return await response.json();
  }
}
