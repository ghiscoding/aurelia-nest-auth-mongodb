import { autoinject } from 'aurelia-dependency-injection';
import { Redirect } from 'aurelia-router';
import { AuthenticationService } from './authentication.service';

@autoinject()
export class AuthorizeStep {
  constructor(private auth: AuthenticationService) { }

  run(routingContext, next) {
    let isLoggedIn = this.auth.isAuthenticated();
    let loginRoute = this.auth.getLoginRoute();

    if (routingContext.getAllInstructions().some(i => i.config.auth)) {
      if (!isLoggedIn) {
        this.auth.setInitialUrl(window.location.href);
        return next.cancel(new Redirect(loginRoute));
      }
    } else if (isLoggedIn && routingContext.getAllInstructions().some(i => i.fragment === loginRoute)) {
      let loginRedirect = this.auth.getLoginRedirect();
      return next.cancel(new Redirect(loginRedirect));
    }

    return next();
  }
}
