import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Globals } from '../shared/globals';

@autoinject()
export class CatsDataService {
  constructor(protected http: HttpClient) {
    this.http = http;
  }

  getAll<T>(): Promise<T> {
    return this.http.fetch(Globals.baseGraphQlUrl, {
      method: 'post',
      body: json({ query: `query { cats { id, name, age, breed, owner { id, displayName } }}` })
    }).then(response => response.json());
  }

  getCats(query: string): Promise<any> {
    console.log(query)
    return new Promise(async resolve => {
      const response = await this.http.fetch(Globals.baseGraphQlUrl, {
        method: 'post',
        body: json({ query })
      });
      resolve(response.json());
    });
  }
}
