import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import Swal from 'sweetalert2';

import authConfig from './auth-config.development';
import { PopupService } from 'shared/services/popup.service';
import { AuthDataService } from './auth-data.service';
import { AuthUtilityService } from './auth-utility.service';
import { BootstrapFormRenderer } from 'shared/bootstrap-form-renderer';

@autoinject()
export class Login {
  heading: string = 'Login';
  email: string = '';
  password: string = '';
  controller: ValidationController = null;

  constructor(
    private authUtilityService: AuthUtilityService,
    private authDataService: AuthDataService,
    private controllerFactory: ValidationControllerFactory,
    private popupService: PopupService,
    private router: Router,
  ) {
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.addFormValidations();
  }

  activate(params: any) {
    console.log('params', params)
    if (params.token || params.code) {
      this.authUtilityService.saveTokenAndRedirect(params.token || params.code);
    }
  }

  async login(): Promise<any> {
    const result = await this.controller.validate();
    if (result.valid) {
      console.log('login', this.email, this.password)
      try {
        const resp = await this.authDataService.login(this.email.toLowerCase(), this.password);
        if (resp.statusCode === 401) {
          Swal.fire('Login', 'Invalid username and/or password', 'error');
        }
        console.log('resp', resp)
        this.activate(resp);
      } catch (e) {
        Swal.fire('Oops...', e.message, 'error');
      }
    }
  }

  async authOpen(provider) {
    try {
      const providerConfig = authConfig.providers[provider];
      const endpointUrl = providerConfig.authorizationEndpoint;
      const target = authConfig.platform === 'mobile' ? '_self' : provider; // you can perhaps look at the screen size to know it's a mobile?
      const popupSizes = {
        height: providerConfig.popupSize.height || 800,
        width: providerConfig.popupSize.width || 800,
      }

      this.popupService.open(endpointUrl, target, popupSizes);

      // Desktop
      const token = await this.popupService.pollPopup();
      this.authUtilityService.saveTokenAndRedirect(token);
    } catch (error) {
      console.log(error);
    }
  }

  addFormValidations() {
    ValidationRules
      .ensure('email').required().email()
      .ensure('password').required()
      .on(this);
  }

  forgotPassword() {
    Swal.fire('Forgot Password', `No problem, we'll send you an email with a temporary password`, 'info');
  }
}
