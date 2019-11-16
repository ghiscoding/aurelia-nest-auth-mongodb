import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class StorageService {
  storage: Storage;

  constructor() {
    this.storage = this._getStorage('localStorage');
  }

  get(key): any {
    return this.storage.getItem(key);
  }

  set(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  _getStorage(type: string) {
    if (type === 'localStorage') {
      if ('localStorage' in window && window.localStorage !== null) {
        return localStorage;
      }
      throw new Error('Local Storage is disabled or unavailable.');
    } else if (type === 'sessionStorage') {
      if ('sessionStorage' in window && window.sessionStorage !== null) {
        return sessionStorage;
      }
      throw new Error('Session Storage is disabled or unavailable.');
    }

    throw new Error('Invalid storage type specified: ' + type);
  }
}
