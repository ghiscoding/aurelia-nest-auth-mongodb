export interface AuthConfig {
  baseUrl: string;
  loginRedirect: string;
  loginRoute: string;
  platform?: 'desktop' | 'mobile';
  profileEndpoint: string;
  providers: {
    [provider: string]: {
      authorizationEndpoint: string;
      popupSize?: {
        height: number;
        width: number;
      }
    };
  }
  storage: 'cookie' | 'localStorage' | 'sessionStorage';
  tokenName: string;
}

let configForDevelopment = {
  baseUrl: 'http://localhost:3000/auth',
  loginRedirect: 'profile',
  loginRoute: 'login',
  platform: 'desktop',
  storage: 'localStorage',
  tokenName: 'token',
  profileEndpoint: 'http://localhost:3000/auth/me',
  providers: {
    facebook: {
      authorizationEndpoint: 'http://localhost:3000/auth/facebook',
      popupSize: { width: 580, height: 400 }
    },
    github: {
      authorizationEndpoint: 'http://localhost:3000/auth/github',
      popupSize: { width: 1020, height: 618 }
    },
    google: {
      authorizationEndpoint: 'http://localhost:3000/auth/google',
      popupSize: { width: 452, height: 633 }
    },
    linkedin: {
      authorizationEndpoint: 'http://localhost:3000/auth/linkedin',
      popupSize: { width: 527, height: 582 }
    },
    twitter: {
      authorizationEndpoint: 'http://localhost:3000/auth/twitter',
      popupSize: { width: 495, height: 645 }
    },
    microsoft: {
      authorizationEndpoint: 'http://localhost:3000/auth/microsoft',
      popupSize: { width: 500, height: 560 }
    },
    windowslive: {
      authorizationEndpoint: 'http://localhost:3000/auth/windowslive',
      popupSize: { width: 500, height: 560 }
    },
  }
} as AuthConfig;

let configForProduction = {
  loginRedirect: 'profile',
  providers: {
    facebook: {
      authorizationEndpoint: 'http://example.com/auth/facebook',
    },
  }
} as Partial<AuthConfig>;

let config: AuthConfig;
if (window.location.hostname === 'localhost') {
  config = configForDevelopment;
}
else {
  config = { ...configForProduction, ...configForDevelopment };
}

export default config;
