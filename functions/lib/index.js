"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const corsHandler = cors({ origin: true });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const createOwner = functions.https.onRequest((request, response) => {
//     corsHandler(request, response, () => {
//         const email = request.body.email;
//         const password = request.body.password;
//         const name = request.body.name;
//         const phone = request.body.phone;
//         // const serviceAccount = require('./serviceAccount.json');
//         admin.initializeApp({
//             credential: admin.credential.cert({
//                 "projectId": "requestordev",
//                 "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMzSUiPUt2l7V9\ng23Ix1YqjtfTWua4dAIiowPLCAUPoCy45N0Wu6ND76WJwuOUBv4L4L02HldzD1WJ\nrNmrpeEesBC9VCiVHLooyM5nUhNKIJ7dajL8A4arEH7Sj+xixSYPyafjCbdOsb1x\n/wkzzDef5zM7Gne0XXGUjhdPNwbV67ydG2kzjzNw+S1s6nxmiRMfJe5FjGg3I95u\ncV9rTTJd5XT/kvGIVmmDEdAf7ZEMmQFmnDYbHO2Nie2iyChN6V0IMYgJRgAy88EY\npTa4xwhe/x2vuBMny099OUQBlhIHNKTvyLAaJya8ti6lmt761+YeRKvt/U3Xjevm\nX6Ic67BNAgMBAAECggEAAbQyOyTx6Ahult79TpaT+bIrCwPeWAoFC4c6LJoCOsVN\nIfOrgDkq7FGF2c3QiWZ+fhhOUrExbpBh2I2i2Pn+E7yIwx58YPM2fEjhaLwm027O\ni46K4oxf9jPirjtKzu6PeMGnfyzRRNsXNafWyoLIMrEgfL0lYk+FtqPw/zR4vtZd\nq7eoYZp4pZDnM6FgwrDQ7s1yDQ1UiHmJeD6MkaJA0/rOPeK1/6OwN6WRICe2V4NB\nHKH290/7ocVI1E5JXt3zGl7QjPhvGyffniagNO7tkQ02zumUigJhYVmbFbU2odto\nw1plMFoQD9ymOaCKiMP5darnXkxiDAz2OomnoM6wuQKBgQD/2zEY+PwxK4QrW5FP\nJwnHRc+npbtYU0nx99GlshYaZfGH0qdUm0NVwQ/79nMbuXRydRWho9CzWhjw4EzM\nUBkY5tPgrdifsao2a4QrIZc13gDxvuVU/i/5Zh/PG8iBVqQ2ooYXicJHlhRebcsJ\nqmsWCZx2AAGGXXcqV2ow//zeuQKBgQDM6pu92qD6CZI6CoDIvaRUXJ88aeD8QyD2\niwnsHCFlkCDlOK4pYTC5OE6zTzuLo2I9iWBEwQjg/hLr0KFOic/PirElZ2gtK0Je\n4hG8VUZb2E6kE2JvekhnAHPAG03vBytQAzzxL3CIU7khbkRuOvDfvhjCN9Av+VJe\nuhdJOPQ0NQKBgQCk0KUjChki735Xk8faLjKdXHo064zwi86hgVtamoqkfLEHJorF\n9LJ+hjxuucZSwLejl4rUsjsZndtdJ5AxORPBt8ga/sIBtSgJoF7mjd/jQlxnXepL\nQubSiJfLCYGy14Y276DjfslY5fO/FIjrdA1Bh/VzCfPxgznlW6Q7ZluVeQKBgDTI\nRZ+MniRprLm4lN2gQ6DbTsTv/NzdqbL3s3GW+V9A1chVZj8QYs2C3HrBcPQR/K8f\nIKX1FwVlTJhjX/lr9BRghCq/TQ09dFYeYzUgvgPQXslSmOtgEyA89JPKNLPaI+Tz\nQJJbhuAGuMwMrCG8muj2/UehusVwsi/mPTNGMVj1AoGAcS2GlFwWY0GjXuLPThUs\n2mvGRwqKrOmDfM5KmDp5KjtNVMs9drMafzlwrUQvp8Vu8Wsy3Li9kFJkiXFff+/A\nIPLZ7h5TRNSpqfNX8EQsfRuKZ8BsXZn8R1WdeJY+80jmYSHIPh6ZFOLt+7OEcdVY\nbghj3XjY1OZjjrt0S4Jt1bo=\n-----END PRIVATE KEY-----\n",
//                 "clientEmail": "firebase-adminsdk-abhf3@requestordev.iam.gserviceaccount.com"
//               }),
//             databaseURL: 'https://requestordev.firebaseio.com"'
//         });
//         admin.auth().createUser({
//             email: email,
//             emailVerified: false,
//             phoneNumber: phone,
//             password: password,
//             displayName: name,
//             disabled: false
//         })
//             .then(function (userRecord: UserRecord) {
//                 // See the UserRecord reference doc for the contents of userRecord.
//                 response.send({
//                     userId: userRecord.uid
//                 });
//                 console.log("Successfully created new user:", userRecord.uid);
//             })
//             .catch(function (error) {
//                 response.send({
//                     userId: null
//                 });
//                 console.log("Error creating new user:", error);
//             });
//     });
//     //  response.send("Hello from Firebase!");
// });
exports.createNewOwner = functions.firestore
    .document('users/{newUserId}')
    .onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    const id = event.data.id;
    const email = event.data.data().email;
    const phoneNumber = event.data.data().phoneNumber;
    const password = event.data.data().password;
    const name = event.data.data().name;
    // admin.initializeApp({
    //     credential: admin.credential.cert({
    //         "projectId": "requestordev",
    //         "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMzSUiPUt2l7V9\ng23Ix1YqjtfTWua4dAIiowPLCAUPoCy45N0Wu6ND76WJwuOUBv4L4L02HldzD1WJ\nrNmrpeEesBC9VCiVHLooyM5nUhNKIJ7dajL8A4arEH7Sj+xixSYPyafjCbdOsb1x\n/wkzzDef5zM7Gne0XXGUjhdPNwbV67ydG2kzjzNw+S1s6nxmiRMfJe5FjGg3I95u\ncV9rTTJd5XT/kvGIVmmDEdAf7ZEMmQFmnDYbHO2Nie2iyChN6V0IMYgJRgAy88EY\npTa4xwhe/x2vuBMny099OUQBlhIHNKTvyLAaJya8ti6lmt761+YeRKvt/U3Xjevm\nX6Ic67BNAgMBAAECggEAAbQyOyTx6Ahult79TpaT+bIrCwPeWAoFC4c6LJoCOsVN\nIfOrgDkq7FGF2c3QiWZ+fhhOUrExbpBh2I2i2Pn+E7yIwx58YPM2fEjhaLwm027O\ni46K4oxf9jPirjtKzu6PeMGnfyzRRNsXNafWyoLIMrEgfL0lYk+FtqPw/zR4vtZd\nq7eoYZp4pZDnM6FgwrDQ7s1yDQ1UiHmJeD6MkaJA0/rOPeK1/6OwN6WRICe2V4NB\nHKH290/7ocVI1E5JXt3zGl7QjPhvGyffniagNO7tkQ02zumUigJhYVmbFbU2odto\nw1plMFoQD9ymOaCKiMP5darnXkxiDAz2OomnoM6wuQKBgQD/2zEY+PwxK4QrW5FP\nJwnHRc+npbtYU0nx99GlshYaZfGH0qdUm0NVwQ/79nMbuXRydRWho9CzWhjw4EzM\nUBkY5tPgrdifsao2a4QrIZc13gDxvuVU/i/5Zh/PG8iBVqQ2ooYXicJHlhRebcsJ\nqmsWCZx2AAGGXXcqV2ow//zeuQKBgQDM6pu92qD6CZI6CoDIvaRUXJ88aeD8QyD2\niwnsHCFlkCDlOK4pYTC5OE6zTzuLo2I9iWBEwQjg/hLr0KFOic/PirElZ2gtK0Je\n4hG8VUZb2E6kE2JvekhnAHPAG03vBytQAzzxL3CIU7khbkRuOvDfvhjCN9Av+VJe\nuhdJOPQ0NQKBgQCk0KUjChki735Xk8faLjKdXHo064zwi86hgVtamoqkfLEHJorF\n9LJ+hjxuucZSwLejl4rUsjsZndtdJ5AxORPBt8ga/sIBtSgJoF7mjd/jQlxnXepL\nQubSiJfLCYGy14Y276DjfslY5fO/FIjrdA1Bh/VzCfPxgznlW6Q7ZluVeQKBgDTI\nRZ+MniRprLm4lN2gQ6DbTsTv/NzdqbL3s3GW+V9A1chVZj8QYs2C3HrBcPQR/K8f\nIKX1FwVlTJhjX/lr9BRghCq/TQ09dFYeYzUgvgPQXslSmOtgEyA89JPKNLPaI+Tz\nQJJbhuAGuMwMrCG8muj2/UehusVwsi/mPTNGMVj1AoGAcS2GlFwWY0GjXuLPThUs\n2mvGRwqKrOmDfM5KmDp5KjtNVMs9drMafzlwrUQvp8Vu8Wsy3Li9kFJkiXFff+/A\nIPLZ7h5TRNSpqfNX8EQsfRuKZ8BsXZn8R1WdeJY+80jmYSHIPh6ZFOLt+7OEcdVY\nbghj3XjY1OZjjrt0S4Jt1bo=\n-----END PRIVATE KEY-----\n",
    //         "clientEmail": "firebase-adminsdk-abhf3@requestordev.iam.gserviceaccount.com"
    //     }),
    //     databaseURL: 'https://requestordev.firebaseio.com"'
    // });
    admin.initializeApp(functions.config().firebase);
    yield admin.auth().createUser({
        uid: id,
        email: email,
        password: password,
    })
        .then((success) => __awaiter(this, void 0, void 0, function* () {
        // admin
        // .firestore().collection('users').doc(id)
        // .update({
        //     uid: id
        // }).then((res) => { console.log(); })
        // .catch((err) => { console.log(); });
        return yield event.data.ref.set({
            uid: id
        }, { merge: true });
    }))
        .catch((error) => { console.log(error); });
}));
//# sourceMappingURL=index.js.map