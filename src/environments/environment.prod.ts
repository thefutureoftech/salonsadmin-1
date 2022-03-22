// Need to implement runtime config mechanism like this : https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/




export const environment = {
  production: true,
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




