// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // //DEV
  // firebaseConfig: {
  //   apiKey: "AIzaSyAYREN_M-TONfv2iH_b3M7EGLqQ-PETyhg",
  //   authDomain: "game-over-webapp.firebaseapp.com",
  //   projectId: "game-over-webapp",
  //   storageBucket: "game-over-webapp.appspot.com",
  //   messagingSenderId: "597503331914",
  //   appId: "1:597503331914:web:22570fd6547142bb18e0b3"
  // },
  //PROD
  firebaseConfig: {
    apiKey: "AIzaSyB7d3TpKusTwo_Nw3_FcZOLrhOWN0vMPBU",
    authDomain: "go-webapp-prod.firebaseapp.com",
    projectId: "go-webapp-prod",
    storageBucket: "go-webapp-prod.appspot.com",
    messagingSenderId: "57625898562",
    appId: "1:57625898562:web:810db708d80b566d9b07db"
  },



  tokenValidation:{
    userIds: [
      `b8RLEw2jRXYLJxhVLvxBfxVAaH12`,
      `gTiQtOpJ9WPdMAwLd7haivHBFvH2`
    ],
    aud:`game-over-webapp`,
    iss:`https://securetoken.google.com/game-over-webapp`,
    deviceId:`gTiQtOpJ9WPdMAwLd7haivHBFvH2`


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
