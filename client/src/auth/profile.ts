import { autoinject } from 'aurelia-framework';
import { AuthService as LocalAuthService } from '../shared/services/auth.service';
import authConfig from './auth-config.development';
import { PopupService } from 'shared/services/popup.service';

@autoinject()
export class Profile {
  email: string = '';
  password: string = '';
  heading: string = 'Profile';
  profile: any;

  constructor(private authService: LocalAuthService, private popupService: PopupService) { }

  activate(): any {
    this.getCurrentUserInfo();
    this.getCurrentUserInfoWithGraphql();
  }

  getCurrentUserInfo() {
    this.authService.getMe()
      .then(data => this.profile = data)
      .catch(err => console.log(`activate failure in profile.ts => ${err}`));
  }

  getCurrentUserInfoWithGraphql() {
    this.authService.getWhoAmI()
      .then(data => console.log('[GraphQL] Who am I...', data));
  }

  async authenticate(provider) {
    try {
      const providerConfig = authConfig.providers[provider];
      const endpointUrl = `${providerConfig.authorizationEndpoint}?save=false`;
      const target = authConfig.platform === 'mobile' ? '_self' : provider; // you can perhaps look at the screen size to know it's a mobile?
      const popupSizes = {
        height: providerConfig.popupSize.height || 800,
        width: providerConfig.popupSize.width || 800,
      }

      this.popupService.open(endpointUrl, target, popupSizes);

      // Desktop
      return await this.popupService.pollPopup();
    } catch (error) {
      console.log(error);
    }
  }

  async applyLink(providerName: string, providerId: string) {
    providerId ? this.unlink(providerName, providerId) : this.link(providerName);
  }

  async link(providerName: string) {
    const token = await this.authenticate(providerName);
    const user = await this.authService.link(providerName, token);
    this.profile = user;
  }

  async unlink(providerName: string, providerId: string) {
    const user = await this.authService.unlink({ id: providerId, name: providerName });
    this.profile = user;
  }

}
