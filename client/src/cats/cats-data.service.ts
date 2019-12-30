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
      body: json({ query: `query { cats { id, name, age, breed, ownerId }}` })
    }).then(response => response.json());
  }
}
