// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Need to implement runtime config mechanism like this : https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/




export const environment = {
  production: false,
  firebaseConfig :  {
    apiKey: "AIzaSyDrsapYtAvPrzFEMvl91-Zh80LyLUiOcLM",
    authDomain: "omanappsnet.firebaseapp.com",
    databaseURL: "https://omanappsnet.firebaseio.com",
    projectId: "omanappsnet",
    storageBucket: "omanappsnet.appspot.com",
    messagingSenderId: "830672789462",
    appId: "1:830672789462:web:d157fffae4c56117e38e77",
    measurementId: "G-7K2P8K9312"
  },
  apiURL: 'https://ontimeappsapi.firebaseapp.com/api/v1/'
  // apiURL: 'https://us-central1-omanappsnet.cloudfunctions.net/'
};















// {
//   apiKey: "AIzaSyCj8weOsHnkhVbA__xTZTSejVDOM-hlrZM",
//   authDomain: "requestordev.firebaseapp.com",
//   databaseURL: "https://requestordev.firebaseio.com",
//   projectId: "requestordev",
//   storageBucket: "requestordev.appspot.com",
//   messagingSenderId: "364118827235"
// }
