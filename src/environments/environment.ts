// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'get-stream-io-chat',
    appId: '1:45341333118:web:1adf1d1279f052074d2a2f',
    storageBucket: 'get-stream-io-chat.appspot.com',
    apiKey: 'AIzaSyDD2o47Kbw1byvpMX473dVqKBRT97e54pg',
    authDomain: 'get-stream-io-chat.firebaseapp.com',
    messagingSenderId: '45341333118',
  },
  production: false,
  apiUrl: 'https://us-central1-get-stream-io-chat.cloudfunctions.net',
  stream: {
    key: '6gjff8r7rwuc',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
