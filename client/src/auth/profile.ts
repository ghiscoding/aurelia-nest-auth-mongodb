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

  async link(providerName: string) {
    console.log('Link method not implemented yet!');
    const token = await this.authenticate(providerName);
    console.log('token::', token)
    const result = await this.authService.link(providerName, token);
    console.log('result::', result)
    // return this.authService.link(provider)
    //   .then((res) => console.log(res))
    // return this.authService.authenticate(provider, true, null)
    //   .then(() => this.authService.getMe())
    //   .then(data => this.profile = data)
    //   .catch(err => console.log(`link failure in profile.js => ${err}`));
  }

  unlink(provider): any {
    console.log('Unlink method not implemented yet!');
    return this.authService.unlink(provider)
      .then((res) => console.log(res))
    /*.then((response)=>{
      console.log(`auth response ${response}`);
      return this.auth.getMe();
    })*/
    // .then(() => this.auth.getMe())
    // .then(data => {
    //   this.profile = data;
    // }).catch(err => {
    //   console.log(`unlink failure in profile.js => ${err}`);
    // });
  }

}
