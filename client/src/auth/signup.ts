import { autoinject } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import Swal from 'sweetalert2';

import { AuthDataService } from './auth-data.service';
import { AuthUtilityService } from './auth-utility.service';
import { BootstrapFormRenderer } from 'shared/bootstrap-form-renderer';

@autoinject()
export class Signup {
  heading = 'Sign Up';
  email: string = '';
  password = '';
  confirmPassword = '';
  displayName = '';
  controller: ValidationController = null;

  constructor(
    private authUtilityService: AuthUtilityService,
    private authDataService: AuthDataService,
    private controllerFactory: ValidationControllerFactory,
  ) {
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());

    this.addFormValidations();
  }

  async signup(): Promise<any> {
    const result = await this.controller.validate();
    if (result.valid) {
      return this.authDataService.signup(this.email.toLowerCase(), this.password, this.displayName)
        .then((resp) => {
          this.authUtilityService.saveTokenAndRedirect(resp.token);
          Swal.fire('Success...', `You are signup up, please re-enter your email & password to confirm your identity`, 'success');
        })
        .catch((error) => {
          Swal.fire('Oops...', `Something went wrong and we could not verify your sign up. ${error}`, 'error');
        });
    }
    return false;
  }

  async usernameAvailable(email): Promise<boolean> {
    return this.authDataService.usernameAvailable(email.toLowerCase());
  }

  addFormValidations() {
    ValidationRules.customRule(
      'matchesProperty',
      (value, obj, otherPropertyName) =>
        value === null
        || value === undefined || value === ''
        || obj[otherPropertyName] === null
        || obj[otherPropertyName] === undefined
        || obj[otherPropertyName] === ''
        || value === obj[otherPropertyName],
      '${$displayName} must match ${$getDisplayName($config.otherPropertyName)}',
      otherPropertyName => ({ otherPropertyName })
    );

    ValidationRules.customRule(
      'usernameAvailable',
      (value, obj) => this.usernameAvailable(obj.email),
      'Sorry this username is not available',
    )


    ValidationRules
      .ensure('displayName').required()
      .ensure('email').email().required().satisfiesRule('usernameAvailable')
      .ensure('password').required().minLength(5)
      .ensure('confirmPassword').required().satisfiesRule('matchesProperty', 'password')
      .on(this);
  }
}
