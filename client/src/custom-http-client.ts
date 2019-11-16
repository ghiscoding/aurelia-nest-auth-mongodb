import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import 'isomorphic-fetch'; // if you need a fetch polyfill
import * as globalConfig from '../config';
import { AuthService } from 'shared/services/auth.service';

const _httpQueue = [];

@autoinject()
export class CustomHttpClient extends HttpClient {

  constructor(private auth: AuthService, private ea: EventAggregator) {
    super();
    this.configure(config => {
      config
        .withBaseUrl(globalConfig.baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        //we call ourselves the interceptor which comes with aurelia-auth
        //obviously when this custom Http Client is used for services
        //which don't need a bearer token, you should not inject the token interceptor
        .withInterceptor(this.auth['tokenInterceptor'])
        //still we can augment the custom HttpClient with own interceptors
        .withInterceptor({
          request(request) {
            _httpQueue.push(request.url);
            // console.log(`Requesting ${request.method} ${request.url}`);
            ea.publish('http:started', _httpQueue);
            return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(response) {
            // remove any URLs from the queue that are equal
            _httpQueue.forEach((url, i) => {
              if (url === response.url) {
                _httpQueue.splice(i, 1);
              }
            });
            if (_httpQueue.length === 0) {
              ea.publish('http:stopped', _httpQueue);
            }
            // console.log(`Received ${response.status} ${response.url}`);
            return response; // you can return a modified Response
          }
        });
    });
  }
}
