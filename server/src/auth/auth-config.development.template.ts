const authConfig = {
  callbackSuccessUrl: 'http://localhost:9000/login/success',
  callbackFailureUrl: 'http://localhost:9000/login/failure',
  jwtSecretKey: 'A hard to guess string',
  providers: {
    facebook: {
      // https://developers.facebook.com/
      clientID: 'Facebook Client Id',
      clientSecret: 'Facebook Client Secret',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    github: {
      // https://github.com/settings/developers
      clientID: 'GitHub Client Id',
      clientSecret: 'GitHub Client Secret',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    google: {
      // https://console.developers.google.com/
      clientID: 'Google Client Id',
      clientSecret: 'Google Client Secret',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    linkedin: {
      // https://www.linkedin.com/developers/
      clientID: 'LinkedIn Client Id',
      clientSecret: 'LinkedIn Client Secret',
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
    },
    twitter: {
      // https://developer.twitter.com/
      clientID: 'Twitter Client Id',
      clientSecret: 'Twitter Client Secret',
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
    },
    windowslive: {
      // Windows Live Account Strategy
      // https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
      clientID: 'Windows Live Client Id',
      clientSecret: 'Windows Live Client Secret',
      callbackURL: 'http://localhost:3000/auth/windowslive/callback',
    },
    microsoft: {
      // Similar to Windows Live but with Microsoft Graph (API) Strategy
      // https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
      clientID: 'Microsoft Graph Client Id',
      clientSecret: 'Microsoft Graph Client Secret',
      callbackURL: 'http://localhost:3000/auth/microsoft/callback',
    },
  },
};

export default authConfig;
