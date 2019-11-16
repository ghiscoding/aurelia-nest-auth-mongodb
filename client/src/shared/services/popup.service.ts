import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class PopupService {
  config = {};
  popupWindow;
  polling = null;
  redirectUri: string;

  constructor() {
    this.redirectUri = window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/';
  }

  open(url: string, windowName: string, options: any) {
    const optionString = typeof options === 'string' ? options : this.convertJsonToDomString(options);
    this.popupWindow = window.open(url, windowName, optionString);
    if (this.popupWindow && this.popupWindow.focus) {
      this.popupWindow.focus();
    }
  }

  /** 
   * Convert a JSON object into a DOM String 
   * Example: { height: 800, width: 600} into "height=800,width=600"
   */
  convertJsonToDomString(options: any): string {
    let params = new URLSearchParams();
    for (let key in options) {
      params.set(key, options[key])
    }
    const queryParams = params.toString();
    return queryParams.replace('&', ',');
  }

  eventListener() {
    let promise = new Promise((resolve, reject) => {
      this.popupWindow.addEventListener('loadstart', (event) => {
        if (event.url.indexOf(this.redirectUri) !== 0) {
          return;
        }

        let parser = document.createElement('a');
        parser.href = event.url;

        if (parser.search || parser.hash) {
          let queryParams = new URLSearchParams(this.popupWindow.location.search);
          let hashParams = new URLSearchParams(this.popupWindow.location.hash);

          this.popupWindow.close();
          resolve(queryParams.get('code') || hashParams.get('code'));
          return;
        }
      });

      this.popupWindow.addEventListener('exit', () => {
        reject(new Error('Provider Popup was closed'));
      });

      this.popupWindow.addEventListener('loaderror', () => {
        reject(new Error('Authorization Failed'));
      });
    });
    return promise;
  }

  pollPopup(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.polling = setInterval(() => {
        try {
          let documentOrigin = document.location.host;
          let popupWindowOrigin = this.popupWindow.location.host;

          if (popupWindowOrigin === documentOrigin && (this.popupWindow.location.search || this.popupWindow.location.hash)) {
            let queryParams = new URLSearchParams(this.popupWindow.location.search);
            let hashParams = new URLSearchParams(this.popupWindow.location.hash);
            console.log('queryParams::', queryParams.get('save'))
            this.popupWindow.close();
            resolve(queryParams.get('code') || hashParams.get('code'));
            clearInterval(this.polling);
            return;
          }
        } catch (error) {
          // no-op
        }

        if (!this.popupWindow) {
          clearInterval(this.polling);
          reject(new Error('Provider Popup Blocked'));
        } else if (this.popupWindow.closed) {
          clearInterval(this.polling);
          reject(new Error('Problem poll popup'));
        }
      }, 35);
    });
  }
}
