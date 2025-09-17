// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'https://api.vbttridenttrust.com/',
  smtpCredentials: {
    host: 'smtp.elasticemail.com',
    username: 'support@vbttridenttrust.com',
    password: '62AEA67CFD2D2C80C9B40A9F724666BF6319',
    to: 'support@vbttridenttrust.com',
    from: 'support@vbttridenttrust.com'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
