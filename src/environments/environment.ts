// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig :  {
    apiKey: "AIzaSyCj8weOsHnkhVbA__xTZTSejVDOM-hlrZM",
    authDomain: "requestordev.firebaseapp.com",
    databaseURL: "https://requestordev.firebaseio.com",
    projectId: "requestordev",
    storageBucket: "requestordev.appspot.com",
    messagingSenderId: "364118827235"
  }
};
