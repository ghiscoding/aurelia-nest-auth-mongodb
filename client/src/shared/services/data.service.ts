import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Globals } from './../globals';

@autoinject()
export class DataService {
  _baseUrl: string = Globals.baseApiUrl;

  constructor(protected http: HttpClient) {
    this.http = http;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(url: string) {
    this._baseUrl = url;
  }

  create<T>(resource: T): Promise<T> {
    return this.http.fetch(`${this._baseUrl}`, {
      method: 'post',
      body: json(resource)
    })
      .then(response => response.json());
  }

  get<T>(id: number): Promise<T> {
    return this.http.fetch(`${this._baseUrl}/${id}`)
      .then(response => response.json());
  }

  getAll<T>(): Promise<T> {
    return this.http.fetch(`${this._baseUrl}`)
      .then(response => response.json());
  }

  delete<T>(id: number): Promise<T> {
    return this.http.fetch(`${this._baseUrl}/${id}`, {
      method: 'delete'
    })
      .then(response => response.json());
  }

  save<T>(resource: T): Promise<T> {
    if (resource.hasOwnProperty('id')) {
      return this.update<T>(resource);
    }
    else {
      return this.create<T>(resource);
    }
  }

  update<T>(resource: T): Promise<T> {
    if (!resource.hasOwnProperty('id')) {
      throw new Error('Error: your object is missing an id')
    }
    return this.http.fetch(`${this._baseUrl}/${resource['id']}`, {
      method: 'put',
      body: json(resource)
    })
      .then(response => response.json());
  }
}
