"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingLock = exports.checkBookingLock = exports.writeBookingLock = exports.sendPushNotification = exports.getPass = exports.getSignInToken = exports.updateEndUserEmail = exports.deleteUser = exports.updateUser = exports.createOwner = exports.checkPassResetCodeIsValid = exports.sendPassReset = exports.getSearchResult = exports.getHomeData = exports.getBranchDetails = exports.getProductDetails = exports.checkOwnerAlreadyExists = exports.validateAffiliatedId = exports.sendAffiliateNewTransferTransferNotification = exports.createNewBranch = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const stream = require("stream");
const moment = require("moment");
// import * as SNEDGRID from '@sendgrid/mail';
const uuid_1 = require("uuid");
const http = require("https");
// import * as axios from 'axios';
const algoliasearch_1 = require("algoliasearch");
const branch_1 = require("./model/branch");
const geofirestore_1 = require("geofirestore");
const BookingLog_1 = require("./model/BookingLog");
const booking_1 = require("./model/booking");
const bookingReview_1 = require("./model/bookingReview");
// import * as firebase from 'firebase/app';
// import { DeltaDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
const corsHandler = cors({ origin: true });
const ALGOLIA_INDEX_NAME = 'BRANCHES';
let sendPasswordFunc = false;
let sendPasswordResetLinkFunc = false;
let getSignInTokenFunc = false;
// let onBranchCreatedFunc = false;
// let onBranchUpdatedFunc = false;
// let onBranchDeletedFunc = false;
// admin.initializeApp({
//   credential: admin.credential.cert({
//     "projectId": "requestordev",
//     "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMzSUiPUt2l7V9\ng23Ix1YqjtfTWua4dAIiowPLCAUPoCy45N0Wu6ND76WJwuOUBv4L4L02HldzD1WJ\nrNmrpeEesBC9VCiVHLooyM5nUhNKIJ7dajL8A4arEH7Sj+xixSYPyafjCbdOsb1x\n/wkzzDef5zM7Gne0XXGUjhdPNwbV67ydG2kzjzNw+S1s6nxmiRMfJe5FjGg3I95u\ncV9rTTJd5XT/kvGIVmmDEdAf7ZEMmQFmnDYbHO2Nie2iyChN6V0IMYgJRgAy88EY\npTa4xwhe/x2vuBMny099OUQBlhIHNKTvyLAaJya8ti6lmt761+YeRKvt/U3Xjevm\nX6Ic67BNAgMBAAECggEAAbQyOyTx6Ahult79TpaT+bIrCwPeWAoFC4c6LJoCOsVN\nIfOrgDkq7FGF2c3QiWZ+fhhOUrExbpBh2I2i2Pn+E7yIwx58YPM2fEjhaLwm027O\ni46K4oxf9jPirjtKzu6PeMGnfyzRRNsXNafWyoLIMrEgfL0lYk+FtqPw/zR4vtZd\nq7eoYZp4pZDnM6FgwrDQ7s1yDQ1UiHmJeD6MkaJA0/rOPeK1/6OwN6WRICe2V4NB\nHKH290/7ocVI1E5JXt3zGl7QjPhvGyffniagNO7tkQ02zumUigJhYVmbFbU2odto\nw1plMFoQD9ymOaCKiMP5darnXkxiDAz2OomnoM6wuQKBgQD/2zEY+PwxK4QrW5FP\nJwnHRc+npbtYU0nx99GlshYaZfGH0qdUm0NVwQ/79nMbuXRydRWho9CzWhjw4EzM\nUBkY5tPgrdifsao2a4QrIZc13gDxvuVU/i/5Zh/PG8iBVqQ2ooYXicJHlhRebcsJ\nqmsWCZx2AAGGXXcqV2ow//zeuQKBgQDM6pu92qD6CZI6CoDIvaRUXJ88aeD8QyD2\niwnsHCFlkCDlOK4pYTC5OE6zTzuLo2I9iWBEwQjg/hLr0KFOic/PirElZ2gtK0Je\n4hG8VUZb2E6kE2JvekhnAHPAG03vBytQAzzxL3CIU7khbkRuOvDfvhjCN9Av+VJe\nuhdJOPQ0NQKBgQCk0KUjChki735Xk8faLjKdXHo064zwi86hgVtamoqkfLEHJorF\n9LJ+hjxuucZSwLejl4rUsjsZndtdJ5AxORPBt8ga/sIBtSgJoF7mjd/jQlxnXepL\nQubSiJfLCYGy14Y276DjfslY5fO/FIjrdA1Bh/VzCfPxgznlW6Q7ZluVeQKBgDTI\nRZ+MniRprLm4lN2gQ6DbTsTv/NzdqbL3s3GW+V9A1chVZj8QYs2C3HrBcPQR/K8f\nIKX1FwVlTJhjX/lr9BRghCq/TQ09dFYeYzUgvgPQXslSmOtgEyA89JPKNLPaI+Tz\nQJJbhuAGuMwMrCG8muj2/UehusVwsi/mPTNGMVj1AoGAcS2GlFwWY0GjXuLPThUs\n2mvGRwqKrOmDfM5KmDp5KjtNVMs9drMafzlwrUQvp8Vu8Wsy3Li9kFJkiXFff+/A\nIPLZ7h5TRNSpqfNX8EQsfRuKZ8BsXZn8R1WdeJY+80jmYSHIPh6ZFOLt+7OEcdVY\nbghj3XjY1OZjjrt0S4Jt1bo=\n-----END PRIVATE KEY-----\n",
//     "clientEmail": "firebase-adminsdk-abhf3@requestordev.iam.gserviceaccount.com"
//   }),
//   databaseURL: 'https://requestordev.firebaseio.com'
// });
admin.initializeApp({
    credential: admin.credential.cert({
        "projectId": "omanappsnet",
        "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoqUgSZJGxAV2d\nNmwXfmgKuzFlwLob40qM/tz8uB4K44+anQgpmNzNpeFUTvon+fGaT5AHBWYmIs8B\n95j0TZ8wk3RWnzRxnakGgfdptjKIt94LwssXW71Oc/Cn0pu0d68pr5oJNPTykjb6\nRZnSXMT4EdDDfAFF86ml8C0Hw++3EWG695rJ8gKB/jQBdOS2kfpo2OfStAJjwHUB\n8LXSA5QEpyGFqqj3YcCp+anYyUEKWJSIYcWOnJRXgZjY9D9alON5iJd+1IgEWppk\nfzSKBpKgDtar0GK7RWJcmYhRkPK5z/cUz1UVR8HFSwYcxsBzzJ62JCCpmFEntybZ\nnnBt9zZBAgMBAAECggEAA1Gwghx8oal7l9ij3tWn8xUdEInu8lX3iBKLE1tFYRS6\nb9zJAIuPmymZZ3e16c6RWVEZQ3VxCGKtOkukH45S/zQEU+Dmbu7JuPUauGJ44wf4\n8fg416+gcuBVIzJXH4GESZCuekxSiTRaKgmaWzbO5qxavxbBbiiwmnFsFhqTojbo\ndL1J7wVAGprxTGAg/G19ccYUoIdaXPNTlCQ/rFLDR4N1i9bMAkSeOblyJEqzxanP\nbRY7NVFt0bDFBN21qnmbKC/lJij+oEAGiMSVeuUfPZFFO2MaW1AIqcypy1HoQnyb\nTwIzN5Tz+W9AG8LX6qOlgZOBqVCsGNALHLacm6XvIQKBgQDatMxnTw+ckGXyyQJp\nsFUNyEv5SzmTmeajYCP0EsArJYhZSEXbvjTVUXNea/o4xFIHJgswyISDxYeMcpPt\nPlIDRRIoSKEzsHqJxVAB6yO2ygQF2lDWqlQpbWu+yeTJw7VCwNn1qVhuRg4XV8v9\nPIDKeXbbRK9Gxy+RYIdw//UAEQKBgQDFa915AepBYhtpoBvdfcDCIUtGSq0+eCH7\nfNTXRPykfTcRwYPDjwQDon712f6/0RAahp+JE+Boz3WYMAJxa1lBMapEBzhCgWqM\no6CFns7ZnXPeC3utfwVbmsuUfFObfSgeW+m/xI/dLN4o2gNSCUY5zjITGlvpcDDs\nQU9OcfIDMQKBgFyjmLFp28MFpylf25XJCz37SbMfGhRbbEZnwtLv3lZoX4jyBCVA\nPEDfb27fbe39uoEsrDDNvtPSJ8hmACLN8w9PgpFtslqitkUFPw6Q+1/B0lJoVzWW\nkG+72ZfHDRIpw+2yoqBcSwjqw60/kziBGEyrhpz6SwQ/+vYpXTWQNccBAoGBAL04\nwMM9+aiHfxzDUFIAOSQYw0xxQRHSFUg1gs9+GOUT+xdysnda+Y7+TdAZDJoPqO6z\nv++j9ICg7+ZZhc3uBVN+ZeLkRKFB5707DB1mdH6R8r+NpBJL3/fIK357l6s9z5kh\noa6jmPx2B82CAJK9vuii4M38gsIBPXMEuh3HCx7RAoGBAKnVc0dHBclflpvPbZul\nMzowvKjYdoyKqqnBC1Wdm8H3ADPTBP+IUdKwNF4FWxOgAiQLYJ5ApkFS3+uyeJGq\n612PCC3r4qL7knQO1It7pNn9NbEt0WkBfUXy+gPBYiNn3aWqxXOVNhj+ycpd2h6/\n4gnJDVdRUsAU58nx6lp4JCFI\n-----END PRIVATE KEY-----\n",
        "clientEmail": "firebase-adminsdk-xpdae@omanappsnet.iam.gserviceaccount.com"
    }),
    storageBucket: "omanappsnet.appspot.com"
});
// export const updateUserRecord = functions.auth.user().onCreate(async (user) => {
// const atIndex = user.email.lastIndexOf('@');
// const phoneNumber = user.email.substr(0, atIndex);
// const userCollection = admin.firestore().collection('users');
// let data = {};
// data = {
//     email: user.email,
//     name: 'Change',
//     arabicName: 'Change',
//     emailVerified: false,
//     phoneNumber: phoneNumber,
//     uid: user.uid,
//     password: 'dasjh398721hj',
//     createdAt: user.metadata.creationTime
// };
// await userCollection.add(data);
// });
exports.createNewBranch = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('email is ' + request.body.email);
        console.log('owner name 3 is ' + request.body.ownerName);
        console.log('phone number is ' + request.body.phoneNumber);
        console.log(' rtlSet is ' + request.body.rtlSet);
        console.log('countrId is ' + request.body.countryId);
        console.log('stateId is ' + request.body.stateId);
        console.log('cityId is ' + request.body.cityId);
        console.log('branchName is ' + request.body.branchName);
        console.log('branch Arabic Name is ' + request.body.branchArabicName);
        console.log('owner is staff is ' + request.body.ownerIsStaff);
        console.log('selected package is ' + request.body.selectedPackage);
        console.log('affiliate id is ' + request.body.affiliate_id);
        console.log('store id is ' + request.body.storeId);
        console.log('store logoURL id is ' + request.body.logoURL);
        console.log('owner id is ' + request.body.ownerUID);
        let uid;
        if (!request.body.storeId) {
            uid = yield createStaff(request.body.email, request.body.phoneNumber, request.body.ownerName, request.body.rtlSet);
        }
        if (!uid) {
            uid = request.body.ownerUID;
        }
        yield createStoreAndBranch(request.body.logo, uid, request.body.countryId, request.body.stateId, request.body.cityId, request.body.branchName, request.body.branchArabicName, request.body.ownerIsStaff, request.body.ownerName, request.body.email, uid, request.body.selectedPackage, request.body.affiliate_id, request.body.storeId, request.body.logoURL);
        return response.status(201).send({
            done: 'ok'
        });
    }));
});
function createStaff(email, phoneNumber, name, rtlSet) {
    return __awaiter(this, void 0, void 0, function* () {
        let userRec = {};
        let password;
        password = Math.floor(Math.random() * 900000) + 100000;
        userRec = yield admin.auth().createUser({
            email: email,
            password: '' + password
        }).catch(error => {
            console.log('error while creating a new user');
            console.log(error);
            return {};
        });
        let dateNow = new Date();
        let newDate = new Date(dateNow);
        newDate.setTime(newDate.getTime() + (4 * 60 * 60 * 1000));
        if (userRec.uid) {
            let data2 = {
                email: email,
                name: name,
                arabicName: name,
                emailVerified: false,
                phoneNumber: '' + phoneNumber,
                uid: userRec.uid,
                createdBy: 'online',
                isRTL: rtlSet,
                createdAt: newDate
            };
            let docRef = yield admin.firestore().collection('staff_users').add(data2);
            if (docRef && docRef.id) {
                yield sendPassword(email, password);
                return userRec.uid;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    });
}
function createStoreAndBranch(logo, uid, countryId, stateId, cityId, branchName, branchArabicName, ownerIsStaff, ownerName, ownerEmail, ownerUID, selectedPackage, affiliateId, storeId, storeLogoURL) {
    return __awaiter(this, void 0, void 0, function* () {
        let logoURL;
        let docRef;
        if (!storeId) {
            let data = {
                name: 'salons',
                arabicName: 'صالونات',
                busTypeId: '1',
                ownerId: uid,
                countryId: countryId
            };
            docRef = yield admin.firestore().collection('stores').add(data);
            if (docRef && docRef.id) {
                const mimeType = logo.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
                let myFile = logo.replace(/^data:image\/[a-z]+;base64,/, '');
                let filePath = 'stores/' + docRef.id + '/images/logo';
                console.log('path for file is ' + filePath);
                const bucket = admin.storage().bucket();
                const file = bucket.file(filePath);
                const imageBuffer = Buffer.from(myFile, 'base64');
                const bufferStream = new stream.PassThrough();
                bufferStream.end(imageBuffer);
                bufferStream.pipe(file.createWriteStream({
                    metadata: {
                        contentType: mimeType,
                    }
                }));
                let newPromise = new Promise((resolve, reject) => {
                    bufferStream.pipe(file.createWriteStream({
                        metadata: {
                            contentType: mimeType
                        },
                        public: true,
                        validation: "md5"
                    }))
                        .on('error', (err) => {
                        console.log('error from image upload', err);
                        reject(err);
                    })
                        .on('finish', () => __awaiter(this, void 0, void 0, function* () {
                        // The file upload is complete.
                        let signedURLs = yield file.getSignedUrl({
                            action: 'read',
                            expires: '03-09-2491'
                        });
                        resolve(signedURLs[0]);
                    }));
                });
                logoURL = yield newPromise;
                yield docRef.update({ logoURL: logoURL });
            }
        }
        let schedule = [
            {
                dayName: 'Sun',
                arabicName: 'الأحد',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '0',
            },
            {
                dayName: 'Mon',
                arabicName: 'الإثنين',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '1'
            },
            {
                dayName: 'Tue',
                arabicName: 'الثلاثاء',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '2'
            },
            {
                dayName: 'Wed',
                arabicName: 'الأربعاء',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '3'
            },
            {
                dayName: 'Thu',
                arabicName: 'الخميس',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '4'
            },
            {
                dayName: 'Fri',
                arabicName: 'الجمعه',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '5'
            },
            {
                dayName: 'Sat',
                arabicName: 'السبت',
                fromTime: new Date(),
                toTime: new Date(),
                fromTime2: new Date(),
                toTime2: new Date(),
                daySelected: true,
                dayNum: '6'
            }
        ];
        for (let day of schedule) {
            day.fromTime.setHours(9);
            day.fromTime.setMinutes(0);
            day.toTime.setHours(12);
            day.toTime.setMinutes(0);
            day.fromTime2.setHours(13);
            day.fromTime2.setMinutes(0);
            day.toTime2.setHours(21);
            day.toTime2.setMinutes(0);
        }
        let data2 = {
            name: branchName,
            arabicName: branchArabicName,
            storeId: storeId ? storeId : docRef.id,
            storeLogoURL: storeLogoURL ? storeLogoURL : '' + logoURL,
            address: {
                countryId: countryId,
                stateId: stateId,
                cityId: cityId
            },
            schedule: schedule,
            setting: {
                booking: {
                    booking_hours_advance: 0,
                    cancel_upto_hours_advance: 0,
                    not_allow_staff_selection: false,
                    not_allow_booking_overlap: false,
                    online_policy: '',
                    online_policy_arabic: '',
                    branch_short_descr: '',
                    branch_short_descr_arabic: ''
                }
            }
        };
        let docRef2 = yield admin.firestore().collection('branches').add(data2);
        if (docRef2 && docRef2.id) {
            if (ownerIsStaff) {
                let dateNow = new Date();
                let newDate = new Date(dateNow);
                newDate.setTime(newDate.getTime() + (4 * 60 * 60 * 1000));
                const querySnapshot = yield admin.firestore().collection('roles').where('name', '==', 'staff').get().catch(error => { return { empty: true }; });
                if (!querySnapshot.empty) {
                    let branchStaff = {
                        branch: docRef2.id,
                        workName: ownerName,
                        workArabicName: ownerName,
                        workEmail: ownerEmail,
                        createdAt: newDate,
                        user: ownerUID,
                        roles: querySnapshot.docs[0].id
                    };
                    let docRef3 = yield admin.firestore().collection('branch_staff').add(branchStaff);
                    if (docRef3 && docRef3.id) {
                        console.log('branch staff created with id ' + docRef3.id);
                        yield createInvoice(docRef2.id, selectedPackage, affiliateId, branchName, branchArabicName);
                    }
                }
            }
            else {
                yield createInvoice(docRef2.id, selectedPackage, affiliateId, branchName, branchArabicName);
            }
        }
    });
}
function createInvoice(branchId, selectedPackage, affiliateId, branchName, branchArabicName) {
    return __awaiter(this, void 0, void 0, function* () {
        let invoice = {};
        let planPricing;
        let dateNow = new Date();
        let newDate = new Date(dateNow);
        newDate.setTime(newDate.getTime() + (4 * 60 * 60 * 1000));
        const querySnapshot = yield admin.firestore().collection('plan_pricing').get().catch(error => { return { empty: true }; });
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            const id = querySnapshot.docs[0].id;
            planPricing = Object.assign({ id }, data);
        }
        invoice.package = selectedPackage;
        if (selectedPackage === 'card1') {
            if (affiliateId && affiliateId !== '') {
                invoice.amount = planPricing.package1.price - planPricing.package1.affiliate_discount;
                invoice.affiliateId = affiliateId;
                invoice.affiliateAmount = 10; //might change in the future per each affiliate
            }
            else {
                invoice.amount = planPricing.package1.price;
            }
            let nextDate = moment(newDate);
            let days = planPricing.package1.period * planPricing.package1.days;
            nextDate.add(days, 'days');
            invoice.nextPaymentDate = nextDate.toDate();
        }
        else {
            if (affiliateId && affiliateId !== '') {
                invoice.amount = planPricing.package2.price - planPricing.package2.affiliate_discount;
                invoice.affiliateId = affiliateId;
                invoice.affiliateAmount = 10; //might change in the future per each affiliate
            }
            else {
                invoice.amount = planPricing.package2.price;
            }
            let nextDate = moment(newDate);
            let days = planPricing.package2.period * planPricing.package2.days;
            nextDate.add(days, 'days');
            invoice.nextPaymentDate = nextDate.toDate();
        }
        invoice.currency = 'OMR';
        invoice.paymentDate = newDate;
        invoice.branchId = branchId;
        let docRef = yield admin.firestore().collection('branch_invoices').add(invoice);
        if (docRef && docRef.id) {
            console.log('invoice created');
            if (affiliateId && affiliateId !== '') {
                yield creditAffiliate(affiliateId, branchName, branchArabicName);
            }
        }
    });
}
function creditAffiliate(userId, branchName, branchArabicName) {
    return __awaiter(this, void 0, void 0, function* () {
        let affiliatedUser = {};
        let dateNow = new Date();
        let newDate = new Date(dateNow);
        newDate.setTime(newDate.getTime() + (4 * 60 * 60 * 1000));
        const querySnapshot = yield admin.firestore().collection('users_affiliated').where('userId', '==', userId).get().catch(error => { return { empty: true }; });
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            const id = querySnapshot.docs[0].id;
            affiliatedUser = Object.assign({ id }, data);
            affiliatedUser.readyToPayAmount = affiliatedUser.readyToPayAmount + 10; //we need to read increase amount from config later on
            affiliatedUser.lastUpdated = newDate;
            yield querySnapshot.docs[0].ref.update(affiliatedUser);
            yield sendPushNotificationTiAffiliate(userId, branchName, branchArabicName);
        }
        // else {
        //   affiliatedUser.userId = userId;
        //   affiliatedUser.currency = 'OMR';
        //   affiliatedUser.readyToPayAmount = 10;
        //   affiliatedUser.totalPaidAmount = 0;
        //   const querySnapshot2: Partial<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> = await admin.firestore().collection('users').where('userId', '==', userId).get().catch(error => { return { empty: true } });
        //   if (!querySnapshot2.empty) {
        //     affiliatedUser.userArabicName = querySnapshot2.docs[0].data().arabicName;
        //     affiliatedUser.userName = querySnapshot2.docs[0].data().name;
        //   }
        //   await admin.firestore().collection('users_affiliated').add(affiliatedUser);
        // }
    });
}
function sendPushNotificationTiAffiliate(affiliateId, branchName, branchArabicName) {
    return __awaiter(this, void 0, void 0, function* () {
        const querySnapshot1 = yield admin.firestore().collection('devices').where('userId', '==', affiliateId).get().catch(error => { return { empty: true }; });
        const querySnapshot2 = yield admin.firestore().collection('users').where('uid', '==', affiliateId).get().catch(error => { return { empty: true }; });
        if (!querySnapshot2.empty) {
            let rtlSet = querySnapshot2.docs[0].data().rtlSet;
            let title;
            let body;
            if (rtlSet) {
                title = 'ربحت مبلغ';
                body = '<p>' + branchArabicName + ' إنظم إلى OA Salons' + '</p>';
                body = body + '<p>' + 'لقد حصلت على ١٠ ريال عماني' + '</p>';
                body = body + '<p>' + '!عمل جيد' + '</p>';
            }
            else {
                title = 'New Commission';
                body = '<p>' + branchName + ' has joined OA Salons' + '</p>';
                body = body + '<p>' + 'You earned 10 OMR' + '</p>';
                body = body + '<p>' + 'Keep Up the Good Work!' + '</p>';
            }
            let payload = {
                notification: {
                    title: title,
                    body: body
                },
                data: {
                    messageType: 'affiliate'
                }
            };
            const tokens = querySnapshot1.docs[0].data().tokens;
            yield admin.messaging().sendToDevice(tokens, payload);
        }
    });
}
exports.sendAffiliateNewTransferTransferNotification = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let affiliateId = request.body.affiliateId;
        let affiliateType = request.body.affiliateType;
        let affiliateAmount = +request.body.transferAmount;
        const documentSnapshot = yield admin.firestore().collection('users_affiliated').doc(affiliateId).get();
        if (documentSnapshot && documentSnapshot.exists) {
            let userId = documentSnapshot.data().userId;
            const querySnapshot1 = yield admin.firestore().collection('devices').where('userId', '==', userId).get().catch(error => { return { empty: true }; });
            const querySnapshot2 = yield admin.firestore().collection('users').where('uid', '==', userId).get().catch(error => { return { empty: true }; });
            if (!querySnapshot2.empty) {
                let rtlSet = querySnapshot2.docs[0].data().rtlSet;
                let title;
                let body;
                if (rtlSet) {
                    if (affiliateType === 'members') {
                        title = 'التسويق';
                        body = 'تم تفعيل صفحة التسويق الخاصة بك';
                    }
                    else if (affiliateType === 'requests') {
                        title = 'تم التحويل';
                        body = 'تم تحويل العموله ' + affiliateAmount + ' ' + documentSnapshot.data().currency + ' إلى حسابك في البنك';
                    }
                }
                else {
                    if (affiliateType === 'members') {
                        title = 'Affiliate';
                        body = 'Your Affiliate Page is Activated';
                    }
                    else if (affiliateType === 'requests') {
                        title = 'Transfer Completed';
                        body = 'Your Commission ' + affiliateAmount + ' ' + documentSnapshot.data().currency + ' is Sent To Your Bank Account';
                    }
                }
                let payload = {
                    notification: {
                        title: title,
                        body: body
                    },
                    data: {
                        messageType: 'affiliate'
                    }
                };
                const tokens = querySnapshot1.docs[0].data().tokens;
                yield admin.messaging().sendToDevice(tokens, payload);
            }
        }
    }));
});
function sendBookingReminderPushNotification(booking, bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const querySnapshot1 = yield admin.firestore().collection('devices').where('userId', '==', booking.user).get().catch(error => { return { empty: true }; });
        const querySnapshot2 = yield admin.firestore().collection('users').where('uid', '==', booking.user).get().catch(error => { return { empty: true }; });
        if (!querySnapshot2.empty) {
            let rtlSet = querySnapshot2.docs[0].data().rtlSet;
            let title;
            let body;
            if (rtlSet) {
                let formatter = 'YYYY-MM-DD HH:mm';
                let reminderDate = moment(booking.time_from).format(formatter);
                title = 'تذكير موعدك قريب';
                body = booking.selectedServicePrice.arabicName + ' بتاريخ ' + reminderDate + ' مع صالون ' + booking.branch_arabic_name;
            }
            else {
                let formatter = 'YYYY-MM-DD HH:mm';
                let reminderDate = moment(booking.time_from).format(formatter);
                title = 'Reminder: Appointment is Soon!';
                body = booking.selectedServicePrice.name + ' on ' + reminderDate + ' with Salon ' + booking.branch_name;
            }
            let payload = {
                notification: {
                    title: title,
                    body: body
                },
                data: {
                    booking_id: bookingId
                }
            };
            const tokens = querySnapshot1.docs[0].data().tokens;
            yield admin.messaging().sendToDevice(tokens, payload);
        }
    });
}
exports.validateAffiliatedId = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let userId = request.body.affiliatedId;
        const querySnapshot = yield admin.firestore().collection('users_affiliated').where('userId', '==', userId).get().catch(error => { return { empty: true }; });
        if (!querySnapshot.empty) {
            if (querySnapshot.docs[0].data().active) {
                return response.status(201).send({
                    affiliated: true
                });
            }
            else {
                return response.status(201).send({
                    affiliated: false
                });
            }
        }
        else {
            return response.status(201).send({
                affiliated: false
            });
        }
    }));
});
exports.checkOwnerAlreadyExists = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let email = request.body.email;
        const querySnapshot = yield admin.firestore().collection('staff_users').where('email', '==', email).get().catch(error => { return { empty: true }; });
        if (!querySnapshot.empty) {
            const querySnapshot2 = yield admin.firestore().collection('stores').where('ownerId', '==', querySnapshot.docs[0].data().uid).get().catch(error => { return { empty: true }; });
            if (!querySnapshot2.empty) {
                return response.status(201).send({
                    exists: true
                });
            }
            else {
                return response.status(201).send({
                    exists: false
                });
            }
        }
        else {
            return response.status(201).send({
                exists: false
            });
        }
    }));
});
exports.scheduledCompleteReviews = functions.pubsub.schedule('00 22 * * *').timeZone('Europe/London').onRun((context) => __awaiter(void 0, void 0, void 0, function* () {
    let dateNow = new Date();
    let newDate = new Date(dateNow);
    newDate.setTime(newDate.getTime() + (4 * 60 * 60 * 1000));
    console.log(newDate);
    const querySnapshot = yield admin.firestore().collection('bookings_reviews').where('status', '==', 1).get().catch(error => { return { empty: true }; });
    if (!querySnapshot.empty) {
        for (let doc of querySnapshot.docs) {
            let reviewDate = doc.data().reviewDate;
            if (reviewDate instanceof admin.firestore.Timestamp) {
                reviewDate = reviewDate.toDate();
            }
            reviewDate.setTime(reviewDate.getTime() + (4 * 60 * 60 * 1000));
            // let momentDate = moment(reviewDate);
            let days = Math.abs(newDate.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24);
            // let days = moment(newDate).diff(momentDate, "days");
            if (days > 7) {
                yield doc.ref.update({ status: 2 });
            }
        }
    }
}));
exports.scheduledBookingsReminder = functions.pubsub.schedule('*/15 * * * *').timeZone('Europe/London').onRun((context) => __awaiter(void 0, void 0, void 0, function* () {
    let dateNow = new Date();
    let newDate = new Date(dateNow);
    newDate.setTime(newDate.getTime() + (4 * 60 * 60 * 1000));
    console.log(newDate);
    const querySnapshot = yield admin.firestore().collection('branch_bookings').where('status', '==', 2).get().catch(error => { return { empty: true }; });
    if (!querySnapshot.empty) {
        for (let doc of querySnapshot.docs) {
            let bookingData = doc.data();
            let time_from = doc.data().time_from;
            if (time_from instanceof admin.firestore.Timestamp) {
                time_from = time_from.toDate();
            }
            time_from.setTime(time_from.getTime() + (4 * 60 * 60 * 1000));
            bookingData.time_from = time_from;
            let hours = Math.abs(newDate.getTime() - time_from.getTime()) / (60 * 60 * 1000);
            if (hours <= 1 && !doc.data().reminder1HourSent) {
                yield sendBookingReminderPushNotification(bookingData, doc.id);
                yield doc.ref.update({ reminder1HourSent: true });
            }
            else if (hours <= 24 && !doc.data().reminder24HoursSent) {
                console.log('booking time_from is');
                console.log(bookingData.time_from);
                yield sendBookingReminderPushNotification(bookingData, doc.id);
                yield doc.ref.update({ reminder24HoursSent: true });
            }
        }
    }
}));
exports.getProductDetails = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let type = request.body.type;
        let productId = request.body.productId;
        let detailProduct = {};
        let documentSnapshot;
        if (type == 'service') {
            documentSnapshot = yield admin.firestore().collection('service_prices').doc(productId).get();
            if (!documentSnapshot.exists || !documentSnapshot.data().name) {
                return null;
            }
            detailProduct.service = documentSnapshot.data();
            detailProduct.service.id = documentSnapshot.id;
        }
        else if (type == 'package') {
            documentSnapshot = yield admin.firestore().collection('branch_packages').doc(productId).get();
            if (!documentSnapshot.exists || !documentSnapshot.data().name) {
                return null;
            }
            detailProduct.package = documentSnapshot.data();
            detailProduct.package.id = documentSnapshot.id;
            let documentSnapshot4;
            detailProduct.package.service_prices = [];
            for (let servicePrice of detailProduct.package.services) {
                documentSnapshot4 = yield admin.firestore().collection('service_prices').doc(servicePrice.service).get();
                const data = documentSnapshot4.data();
                const id = documentSnapshot4.id;
                const obj = Object.assign({ id }, data);
                detailProduct.package.service_prices.push(obj);
            }
        }
        const documentSnapshot2 = yield admin.firestore().collection('branches').doc(documentSnapshot.data().branch).get();
        if (!documentSnapshot2.exists || !documentSnapshot2.data().name) {
            return null;
        }
        detailProduct.branch = documentSnapshot2.data();
        detailProduct.branch.id = documentSnapshot2.id;
        detailProduct.branch.townArabicName = detailProduct.branch.address.town_arabic_name;
        detailProduct.branch.townName = detailProduct.branch.address.town_name;
        return response.status(201).send({
            product: detailProduct
        });
    }));
});
exports.getBranchDetails = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let branchId = request.body.branchId;
        const docSnapshot = yield admin.firestore().collection('branches').doc(branchId).get();
        let singleBranch = new branch_1.Branch();
        if (docSnapshot.exists) {
            singleBranch = docSnapshot.data();
            singleBranch.packages = [];
            singleBranch.service_prices = [];
            singleBranch.service_prices_category_services = [];
            singleBranch.id = docSnapshot.id;
            singleBranch.logo = singleBranch.storeLogoURL;
            const querySnapshot3 = yield admin.firestore().collection('branch_staff').where('branch', '==', branchId).get().catch(error => { return { empty: true }; });
            if (!querySnapshot3.empty) {
                singleBranch.staff = [];
                for (let doc of querySnapshot3.docs) {
                    const data = doc.data();
                    const id = doc.id;
                    const obj = Object.assign({ id }, data);
                    singleBranch.staff.push(obj);
                }
            }
            const querySnapshot2 = yield admin.firestore().collection('services2').where('branch', '==', branchId).get().catch(error => { return { empty: true }; });
            if (!querySnapshot2.empty) {
                for (let doc of querySnapshot2.docs) {
                    const data = doc.data();
                    const id = doc.id;
                    const obj = Object.assign({ id }, data);
                    singleBranch.service_prices_category_services.push(obj);
                }
            }
            if (singleBranch.service_prices_category_services && singleBranch.service_prices_category_services.length > 0) {
                singleBranch.service_prices_category_services.sort((a, b) => 0 - (a.ordering_number > b.ordering_number ? -1 : 1));
            }
            const querySnapshot1 = yield admin.firestore().collection('service_prices').where('branch', '==', branchId).get().catch(error => { return { empty: true }; });
            if (!querySnapshot1.empty) {
                for (let doc of querySnapshot1.docs) {
                    // let serviceCategory = singleBranch.service_prices_category_services.find(serviceCat => { return serviceCat.id === doc.data().service });
                    if (doc.data().selected) {
                        const data = doc.data();
                        const id = doc.id;
                        const obj = Object.assign({ id }, data);
                        // obj['arabicName'] = 'ححححححححححححححححح';
                        singleBranch.service_prices.push(obj);
                    }
                }
                if (singleBranch.service_prices && singleBranch.service_prices.length > 0) {
                    singleBranch.service_prices.sort((a, b) => 0 - (a.ordering_number > b.ordering_number ? -1 : 1));
                }
            }
            hideEmptyServiceCategories(singleBranch);
            console.log(singleBranch.service_prices_category_services);
            const querySnapshot = yield admin.firestore().collection('branch_packages').where('branch', '==', branchId).get().catch(error => { return { empty: true }; });
            if (querySnapshot.docs.length > 0) {
                for (let packageDoc of querySnapshot.docs) {
                    if (isPackageValid(packageDoc.data())) {
                        const data = packageDoc.data();
                        const id = packageDoc.id;
                        if (data.start_date instanceof admin.firestore.Timestamp) {
                            data.start_date = data.start_date.toDate();
                        }
                        if (data.end_date instanceof admin.firestore.Timestamp) {
                            data.end_date = data.end_date.toDate();
                        }
                        const obj = Object.assign({ id }, data);
                        obj['service_prices'] = [];
                        for (let servicePriceId of obj['services']) {
                            let foundServicePrice = singleBranch.service_prices.find(servicePrice => { return servicePrice.id == servicePriceId; });
                            if (foundServicePrice) {
                                obj['service_prices'].push(foundServicePrice);
                            }
                        }
                        singleBranch.packages.push(obj);
                    }
                }
                if (singleBranch.packages && singleBranch.packages.length > 0) {
                    singleBranch.offersAvailable = true;
                }
            }
            singleBranch.townArabicName = singleBranch.address.town_arabic_name;
            singleBranch.townName = singleBranch.address.town_name;
        }
        return response.status(201).send({
            branch: singleBranch
        });
    }));
});
function hideEmptyServiceCategories(selectedBranch) {
    for (let category of selectedBranch.service_prices_category_services) {
        let hideCategory = true;
        let foundPrices = selectedBranch.service_prices.filter(service_price => { return service_price.service === category.id; });
        if (foundPrices && foundPrices.length > 0) {
            hideCategory = false;
        }
        category['hide'] = hideCategory;
    }
}
exports.getHomeData = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let categoryData = [];
        let serviceData = [];
        let services2 = [];
        let planPricing = [];
        let forMainPage = request.body.forMainPage;
        let placesOnly = request.body.placesOnly;
        if (!placesOnly) {
            const querySnapshot1 = yield admin.firestore().collection('categories').where('busType', '==', 'salons').get().catch(error => { return { empty: true }; });
            if (!querySnapshot1.empty) {
                for (let doc of querySnapshot1.docs) {
                    const data = doc.data();
                    const id = doc.id;
                    let obj = Object.assign({ id }, data);
                    categoryData.push(obj);
                }
                // this.categoryData = categoryData;
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const querySnapshot2 = yield admin.firestore().collection('services').where('busType', '==', 'salons').get().catch(error => { return { empty: true }; });
            if (!querySnapshot2.empty) {
                for (let doc of querySnapshot2.docs) {
                    const data = doc.data();
                    const id = doc.id;
                    let obj = Object.assign({ id }, data);
                    serviceData.push(obj);
                }
                // this.serviceData = serviceData;
            }
            // console.log(this.serviceData);
            // this.storeService.setServiceData(this.serviceData);
            for (let category of categoryData) {
                let parent_category = {};
                parent_category.id = category.id;
                parent_category.name = category.name;
                parent_category.arabicName = category.arabicName;
                parent_category.imageURL = category.imageURL;
                parent_category.children = [];
                if (serviceData.length > 0) {
                    parent_category.children = serviceData.filter(item => {
                        return item.parent == category.id;
                    });
                }
                services2.push(parent_category);
            }
            // this.storeService.setServiceTypes(services2);
        }
        if (forMainPage) {
            return response.status(201).send({
                categoryData: categoryData,
                serviceData: serviceData,
                serviceTypes: services2,
            });
        }
        else {
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const querySnapshot3 = yield admin.firestore().collection('countries').get().catch(error => { return { empty: true }; });
            let countryData = [];
            for (let doc of querySnapshot3.docs) {
                const data = doc.data();
                const id = doc.id;
                let obj = Object.assign({ id }, data);
                countryData.push(obj);
            }
            console.log(countryData);
            // this.globalStoreService.setCountries(countryData);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const querySnapshot4 = yield admin.firestore().collection('states').get().catch(error => { return { empty: true }; });
            let stateData = [];
            for (let doc of querySnapshot4.docs) {
                const data = doc.data();
                const id = doc.id;
                let obj = Object.assign({ id }, data);
                stateData.push(obj);
            }
            console.log(stateData);
            // this.globalStoreService.setStates(stateData);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const querySnapshot5 = yield admin.firestore().collection('cities').get().catch(error => { return { empty: true }; });
            let cityData = [];
            for (let doc of querySnapshot5.docs) {
                const data = doc.data();
                const id = doc.id;
                let obj = Object.assign({ id }, data);
                cityData.push(obj);
            }
            console.log(cityData);
            // this.globalStoreService.setCities(cityData);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const querySnapshot6 = yield admin.firestore().collection('towns').get().catch(error => { return { empty: true }; });
            let townData = [];
            for (let doc of querySnapshot6.docs) {
                const data = doc.data();
                const id = doc.id;
                let obj = Object.assign({ id }, data);
                townData.push(obj);
            }
            // this.globalStoreService.setTowns(townData);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (placesOnly) {
                const querySnapshot7 = yield admin.firestore().collection('plan_pricing').get().catch(error => { return { empty: true }; });
                for (let doc of querySnapshot7.docs) {
                    const data = doc.data();
                    const id = doc.id;
                    let obj = Object.assign({ id }, data);
                    planPricing.push(obj);
                }
            }
            return response.status(201).send({
                categoryData: categoryData,
                serviceData: serviceData,
                serviceTypes: services2,
                countryData: countryData,
                stateData: stateData,
                cityData: cityData,
                townData: townData,
                planPricing: planPricing
            });
        }
    }));
});
exports.getSearchResult = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('searchIds is');
        console.log(request.body.searchIDs);
        let branches;
        let searchParams = {};
        let location = { coords: {} };
        searchParams.type = request.body.type;
        location.coords.latitude = request.body.latitude;
        location.coords.longitude = request.body.longitude;
        console.log('latitude is ' + location.coords.latitude + ' and longitude is ' + location.coords.longitude);
        searchParams.kilometers = request.body.kilometers;
        searchParams.searchIDs = request.body.searchIDs;
        searchParams.serviceId = request.body.serviceId;
        searchParams.countryId = request.body.countryId;
        searchParams.stateId = request.body.stateId;
        searchParams.cityId = request.body.cityId;
        searchParams.townId = request.body.townId;
        let today = new Date(request.body.today);
        if (searchParams.type == 'namesearch') {
            console.log('trying to call search result name search function');
            branches = yield findBranchesByPlaces(location, null, null, null, null, null, searchParams.searchIDs);
        }
        else if (searchParams.type == 'location') {
            console.log('trying to call search result location function');
            branches = yield findNearByBranches(location, +searchParams.kilometers, searchParams.serviceId);
        }
        else {
            console.log('trying to call search result places function');
            branches = yield findBranchesByPlaces(location, searchParams.serviceId, searchParams.countryId, searchParams.stateId, searchParams.cityId, searchParams.townId, null, today);
        }
        return response.status(201).send({
            branches: branches
        });
    }));
});
function findNearByBranches(center, distance, serviceId) {
    return __awaiter(this, void 0, void 0, function* () {
        let geofirestore;
        let result = [];
        let result2;
        let branches = [];
        geofirestore = new geofirestore_1.GeoFirestore(admin.firestore());
        const geocollection = geofirestore.collection('branch_location');
        console.log('center is');
        console.log(center);
        console.log('distance is');
        console.log(distance);
        const query = geocollection.near({ center: new admin.firestore.GeoPoint(center.coords.latitude, center.coords.longitude), radius: distance });
        const geoquerySnapshot = yield query.get();
        console.log('geoquerySnapshot empty is ' + geoquerySnapshot.empty);
        console.log('geoquerySnapshot docs are');
        console.log(geoquerySnapshot.docs);
        for (let doc of geoquerySnapshot.docs) {
            // const obj = { id: doc.data().branch_id, distance: +doc.distance.toFixed(2) };
            // branches.push(obj);
            const singleBranch = { id: doc.data().branch_id, distance: +doc.distance.toFixed(2) };
            result.push(singleBranch);
        }
        // geoquerySnapshot.forEach((querySnapshot: GeoFirestoreTypes.QueryDocumentSnapshot) => {
        //   const obj = { id: querySnapshot.data().branch_id, distance: +querySnapshot.distance.toFixed(2) };
        //   branches.push(obj);
        // });
        console.log('current lat is ' + center.coords.latitude);
        console.log('current long is ' + center.coords.longitude);
        console.log('resulted branches number is ' + result.length);
        console.log(JSON.stringify(branches));
        //////////////Get Branches/////////////////
        // for (let branch of branches) {
        //   console.log('processing branch for service');
        //   const querySnapshot: Partial<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> = await admin.firestore().collection('services2').where('branch', '==', branch.id).where('service_type.id', '==', serviceId).get().catch(error => { return { empty: true } });
        //   if (!querySnapshot || querySnapshot.empty) {
        //     continue;
        //   }
        //   console.log('found matching branch for service');
        //   const singleBranch: Partial<Branch> = {};
        //   singleBranch.id = querySnapshot.docs[0].data().branch;
        //   singleBranch.distance = branch.distance;
        //   result.push(singleBranch);
        // }
        console.log('processed all branches for services');
        result2 = [];
        for (let branch of result) {
            const documentSnapshot = yield admin.firestore().collection('branches').doc(branch.id).get();
            let singleBranch = {};
            singleBranch = documentSnapshot.data();
            if (!singleBranch.active) {
                continue;
            }
            console.log('branch data are');
            console.log(singleBranch);
            if (!singleBranch['standardServices'] || !singleBranch['standardServices'].includes(serviceId)) {
                continue;
            }
            singleBranch.id = documentSnapshot.id;
            singleBranch.distance = branch.distance;
            singleBranch.logo = singleBranch['storeLogoURL'];
            if (isPackageValid(singleBranch['package_validity'])) {
                singleBranch.offersAvailable = true;
            }
            singleBranch.townName = singleBranch.address.town_name;
            singleBranch.townArabicName = singleBranch.address.town_arabic_name;
            result2.push(singleBranch);
        }
        return result2;
    });
}
function findBranchesByPlaces(center, serviceId, countryId, stateId, cityId, townId, branchIDs, today) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        result = [];
        if (branchIDs && branchIDs.length > 0) {
            for (let branchId of branchIDs) {
                const docSnapshot = yield admin.firestore().collection('branches').doc(branchId).get();
                const data = docSnapshot.data();
                const id = docSnapshot.id;
                if (!data.active) {
                    continue;
                }
                const obj = Object.assign({ id }, data);
                obj['logo'] = data.storeLogoURL;
                console.log('trying to find distance to branch');
                if (!docSnapshot.data().location) {
                    continue;
                }
                obj['distance'] = getDistanceFromLatLonInKm(center.coords.latitude, center.coords.longitude, docSnapshot.data().location['latitude'], docSnapshot.data().location['longitude']).toFixed(2);
                console.log('found distance to branch');
                if (isPackageValid(data['package_validity'])) {
                    obj['offersAvailable'] = true;
                }
                obj['townName'] = data.address.town_name;
                obj['townArabicName'] = data.address.town_arabic_name;
                result.push(obj);
            }
        }
        else {
            const querySnapshot = yield admin.firestore().collection('branches').where('address.countryId', '==', countryId).where('address.stateId', '==', stateId).
                where('address.cityId', '==', cityId).where('address.townId', '==', townId).get().catch(error => { return { empty: true }; });
            console.log('places querySnapshot empty is ' + querySnapshot.empty);
            for (const doc of querySnapshot.docs) {
                // const querySnapshot2: Partial<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> = await admin.firestore().collection('services2').where('branch', '==', doc.id).where('service_type.id', '==', serviceId).get().catch(error => { return { empty: true } });;
                // if (querySnapshot2.docs) {
                //   if (querySnapshot2.docs.length > 0) {
                if (!doc.data().standardServices || !doc.data().standardServices.includes(serviceId)) {
                    continue;
                }
                const data = doc.data();
                const id = doc.id;
                const obj = Object.assign({ id }, data);
                obj['logo'] = data.storeLogoURL;
                obj['distance'] = getDistanceFromLatLonInKm(center.coords.latitude, center.coords.longitude, doc.data().location['latitude'], doc.data().location['longitude']).toFixed(2);
                if (isPackageValid(data['package_validity'])) {
                    obj['offersAvailable'] = true;
                }
                obj['townName'] = data.address.town_name;
                obj['townArabicName'] = data.address.town_arabic_name;
                result.push(obj);
                //   }
                // }
            }
        }
        return result;
    });
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
exports.onBookingCreate = functions.firestore.document('branch_bookings/{bookingId}').onCreate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = change.data();
    let bookingLog = {};
    initializeBookingLog(bookingLog);
    delete bookingLog.id;
    bookingLog.bookingId = context.params.bookingId;
    bookingLog.bookingItemId = booking.serviceItem_id;
    bookingLog.bookingOrderId = booking.order_id;
    bookingLog.bookingBranchId = booking.branch;
    bookingLog.staffId = booking.assigned_to.id;
    bookingLog.staffName = booking.assigned_to.workName;
    bookingLog.staffArabicName = booking.assigned_to.workArabicName;
    bookingLog.clientId = booking.client_id;
    bookingLog.bookingNewStatus = booking.status;
    bookingLog.bookingNewStatusArabicName = getStatusName(bookingLog.bookingNewStatus, true);
    bookingLog.bookingNewStatusName = getStatusName(bookingLog.bookingNewStatus, false);
    bookingLog.bookingNewStatusDate = booking.lastUpdated;
    bookingLog.servicePrice = booking.selectedServicePrice.id;
    bookingLog.servicePriceName = booking.selectedServicePrice.name;
    bookingLog.servicePriceArabicName = booking.selectedServicePrice.arabicName;
    if (booking.service) {
        bookingLog.productType = BookingLog_1.ProductType.SERVICE;
    }
    else if (booking.package) {
        bookingLog.productType = BookingLog_1.ProductType.PACKAGE;
        bookingLog.packageId = booking.package.id;
        bookingLog.packageName = booking.package.name;
        bookingLog.packageArabicName = booking.package.arabicName;
    }
    // let querySnapshot: Partial<FirebaseFirestore.QuerySnapshot> = await admin.firestore().collection('bookings_logs').where('bookingId', '==', context.params.bookingId).get().catch(error => { return { empty: true }; });
    yield admin.firestore().collection('bookings_logs').add(bookingLog); //for now we only have status log, but once we implement online payment, we need to capture amounts too
}));
exports.onBookingUpdate = functions.firestore.document('branch_bookings/{bookingId}').onUpdate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    let statusChanged = false;
    let amountChanged = false;
    const booking_before = change.before.data();
    const booking_after = change.after.data();
    console.log('assigned booking data is');
    console.log(JSON.stringify(booking_after));
    let bookingLog = {};
    initializeBookingLog(bookingLog);
    // let bookingLogsArray: Partial<BookingLog>[] = [];
    delete bookingLog.id;
    bookingLog.bookingId = context.params.bookingId;
    bookingLog.bookingItemId = booking_after.serviceItem_id;
    bookingLog.bookingOrderId = booking_after.order_id;
    bookingLog.bookingBranchId = booking_after.branch;
    bookingLog.staffId = booking_after.assigned_to.id;
    bookingLog.staffName = booking_after.assigned_to.workName;
    bookingLog.staffArabicName = booking_after.assigned_to.workArabicName;
    bookingLog.clientId = booking_after.client_id;
    bookingLog.bookingStatus = booking_before.status;
    bookingLog.servicePrice = booking_after.selectedServicePrice.id;
    bookingLog.servicePriceName = booking_after.selectedServicePrice.name;
    bookingLog.servicePriceArabicName = booking_after.selectedServicePrice.arabicName;
    bookingLog.bookingStatusArabicName = getStatusName(bookingLog.bookingStatus, true);
    if (booking_after.service) {
        bookingLog.productType = BookingLog_1.ProductType.SERVICE;
    }
    else if (booking_after.package) {
        bookingLog.productType = BookingLog_1.ProductType.PACKAGE;
        bookingLog.packageId = booking_after.package.id;
        bookingLog.packageName = booking_after.package.name;
        bookingLog.packageArabicName = booking_after.package.arabicName;
    }
    bookingLog.bookingStatusName = getStatusName(bookingLog.bookingStatus, false);
    bookingLog.bookingStatusDate = booking_before.lastUpdated;
    if (booking_before.status !== booking_after.status) { //&& booking_after.status != serviceInstanceStatus.NEW
        bookingLog.bookingNewStatus = booking_after.status;
        bookingLog.bookingNewStatusArabicName = getStatusName(bookingLog.bookingNewStatus, true);
        bookingLog.bookingNewStatusName = getStatusName(bookingLog.bookingNewStatus, false);
        bookingLog.bookingNewStatusDate = booking_after.lastUpdated;
        statusChanged = true;
        // let querySnapshot: Partial<FirebaseFirestore.QuerySnapshot> = await admin.firestore().collection('bookings_logs').where('bookingId', '==', context.params.bookingId).get().catch(error => { return { empty: true }; });
        // await admin.firestore().collection('bookings_logs').add(bookingLog);
    }
    else {
        bookingLog.bookingNewStatus = booking_before.status;
        bookingLog.bookingNewStatusArabicName = getStatusName(bookingLog.bookingNewStatus, true);
        bookingLog.bookingNewStatusName = getStatusName(bookingLog.bookingNewStatus, false);
        bookingLog.bookingNewStatusDate = booking_before.lastUpdated;
    }
    if (booking_before.amountPaid !== booking_after.amountPaid) {
        if (booking_after.amountPaid > booking_before.amountPaid) {
            bookingLog.paymentType = BookingLog_1.PaymentType.CREDIT;
            bookingLog.paymentAmount = booking_after.amountPaid - booking_before.amountPaid;
            bookingLog.paymentDate = booking_after.lastUpdated;
        }
        else if (booking_after.amountPaid < booking_before.amountPaid) {
            bookingLog.paymentType = BookingLog_1.PaymentType.DEBIT;
            bookingLog.paymentAmount = booking_before.amountPaid - booking_after.amountPaid;
            bookingLog.paymentDate = booking_after.lastUpdated;
        }
        amountChanged = true;
    }
    if (statusChanged || amountChanged) {
        yield admin.firestore().collection('bookings_logs').add(bookingLog);
    }
    if (statusChanged && booking_after.status === booking_1.serviceInstanceStatus.COMPLETED) {
        yield initiateReview(booking_after, context.params.bookingId);
    }
}));
function initiateReview(bookingData, bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        let booking_review = {};
        booking_review.bookingId = bookingId;
        booking_review.serviceId = bookingData.selectedServicePrice.id;
        booking_review.serviceName = bookingData.selectedServicePrice.name;
        booking_review.serviceArabicName = bookingData.selectedServicePrice.arabicName;
        booking_review.bookingStartTime = bookingData.time_from;
        booking_review.bookingEndTime = bookingData.time_to;
        booking_review.staffId = bookingData.assigned_to.id;
        booking_review.staffName = bookingData.assigned_to.workName;
        booking_review.staffArabicName = bookingData.assigned_to.workArabicName;
        booking_review.clientId = bookingData.client_id;
        let docSnapshot = yield admin.firestore().collection('branch_clients').doc(booking_review.clientId).get();
        if (docSnapshot.exists) {
            booking_review.clientName = docSnapshot.data().name;
            booking_review.clientArabicName = docSnapshot.data().arabicName;
        }
        booking_review.userId = bookingData.user;
        booking_review.branchId = bookingData.branch;
        booking_review.branchName = bookingData.branch_name;
        booking_review.branchArabicName = bookingData.branch_arabic_name;
        booking_review.comments = '';
        booking_review.status = bookingReview_1.ReviewStatus.NEW;
        booking_review.reviewDate = new Date(); //almost same day with UTC
        booking_review.branchOverallRating = 0;
        booking_review.branchPunctualityRating = 0;
        booking_review.staffRating = 0;
        booking_review.serviceRating = 0;
        yield admin.firestore().collection('bookings_reviews').add(booking_review);
    });
}
exports.onBookingReviewUpdate = functions.firestore.document('bookings_reviews/{reviewId}').onUpdate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = change.after.data();
    if (reviewData.status == bookingReview_1.ReviewStatus.UPDATED) {
        yield calculateRatingAverages(reviewData, context.params.reviewId);
    }
}));
function calculateRatingAverages(booking_review, reviewId) {
    return __awaiter(this, void 0, void 0, function* () {
        let docBranchSnapshot = yield admin.firestore().collection('branches').doc(booking_review.branchId).get();
        let docStaffBranchSnapshot = yield admin.firestore().collection('branch_staff').doc(booking_review.staffId).get();
        let docServicePriceSnapshot = yield admin.firestore().collection('service_prices').doc(booking_review.serviceId).get();
        let branch_reviews = [];
        let staff_reviews = [];
        let service_reviews = [];
        let querySnapshot1 = yield admin.firestore().collection('bookings_reviews').where('branchId', '==', booking_review.branchId).get().catch(error => { return { empty: true }; });
        if (!querySnapshot1.empty) {
            for (let doc of querySnapshot1.docs) {
                let id = doc.id;
                let obj = Object.assign({ id: id }, doc.data());
                branch_reviews.push(obj);
            }
        }
        let querySnapshot2 = yield admin.firestore().collection('bookings_reviews').where('staffId', '==', booking_review.staffId).get().catch(error => { return { empty: true }; });
        if (!querySnapshot2.empty) {
            for (let doc of querySnapshot2.docs) {
                let id = doc.id;
                let obj = Object.assign({ id: id }, doc.data());
                staff_reviews.push(obj);
            }
        }
        let querySnapshot3 = yield admin.firestore().collection('bookings_reviews').where('serviceId', '==', booking_review.serviceId).get().catch(error => { return { empty: true }; });
        if (!querySnapshot3.empty) {
            for (let doc of querySnapshot3.docs) {
                let id = doc.id;
                let obj = Object.assign({ id: id }, doc.data());
                service_reviews.push(obj);
            }
        }
        branch_reviews.sort(function compare(a, b) {
            let dateA = new Date(a.reviewDate);
            let dateB = new Date(b.reviewDate);
            return dateA.getTime() - dateB.getTime();
        });
        branch_reviews = branch_reviews.filter(review => { return review.id !== reviewId; });
        staff_reviews.sort(function compare(a, b) {
            let dateA = new Date(a.reviewDate);
            let dateB = new Date(b.reviewDate);
            return dateA.getTime() - dateB.getTime();
        });
        staff_reviews = staff_reviews.filter(review => { return review.id !== reviewId; });
        service_reviews.sort(function compare(a, b) {
            let dateA = new Date(a.reviewDate);
            let dateB = new Date(b.reviewDate);
            return dateA.getTime() - dateB.getTime();
        });
        service_reviews = service_reviews.filter(review => { return review.id !== reviewId; });
        let totalAverage = 0;
        let totalOverall = 0;
        let branchTotal = 0;
        let branchAverage = 0;
        let branchPunctTotal = 0;
        let branchPunctAverage = 0;
        let branchStaffTotal = 0;
        let branchStaffAverage = 0;
        let branchServicesTotal = 0;
        let branchServicesAverage = 0;
        let staffTotal = 0;
        let staffAverage = 0;
        let serviceTotal = 0;
        let serviceAverage = 0;
        for (let branch_review of branch_reviews) {
            if (branch_review.status === bookingReview_1.ReviewStatus.NEW) {
                continue;
            }
            branchTotal = branchTotal + branch_review.branchOverallRating;
            branchPunctTotal = branchPunctTotal + branch_review.branchPunctualityRating;
            branchStaffTotal = branchStaffTotal + branch_review.staffRating;
            branchServicesTotal = branchServicesTotal + branch_review.serviceRating;
            console.log('the first total inside the loop is ' + (branch_review.branchOverallRating + branch_review.branchPunctualityRating + branch_review.staffRating + branch_review.serviceRating) / 4);
            totalOverall = totalOverall + +((branch_review.branchOverallRating + branch_review.branchPunctualityRating + branch_review.staffRating + branch_review.serviceRating) / 4);
        }
        totalOverall = +totalOverall.toFixed(1);
        console.log('the first total overall is ' + totalOverall);
        for (let staff_review of staff_reviews) {
            if (staff_review.status === bookingReview_1.ReviewStatus.NEW) {
                continue;
            }
            staffTotal = staffTotal + staff_review.staffRating;
        }
        for (let service_review of service_reviews) {
            if (service_review.status === bookingReview_1.ReviewStatus.NEW) {
                continue;
            }
            serviceTotal = serviceTotal + service_review.serviceRating;
        }
        console.log('the second new total is ' + ((booking_review.branchOverallRating + booking_review.branchPunctualityRating + booking_review.staffRating + booking_review.serviceRating) / 4));
        totalAverage = ((totalOverall + ((booking_review.branchOverallRating + booking_review.branchPunctualityRating + booking_review.staffRating + booking_review.serviceRating) / 4)) / (branch_reviews.length + 1));
        totalAverage = +totalAverage.toFixed(1);
        branchAverage = (branchTotal + booking_review.branchOverallRating) / (branch_reviews.length + 1);
        branchAverage = +branchAverage.toFixed(1);
        branchPunctAverage = (branchPunctTotal + booking_review.branchPunctualityRating) / (branch_reviews.length + 1);
        branchPunctAverage = +branchPunctAverage.toFixed(1);
        branchStaffAverage = (branchStaffTotal + booking_review.staffRating) / (branch_reviews.length + 1);
        branchStaffAverage = +branchStaffAverage.toFixed(1);
        branchServicesAverage = (branchServicesTotal + booking_review.serviceRating) / (branch_reviews.length + 1);
        branchServicesAverage = +branchServicesAverage.toFixed(1);
        console.log('staff total is ' + staffTotal);
        console.log('staff has ' + staff_reviews.length + ' reviews not including this one');
        console.log('current staff rating is ' + booking_review.staffRating);
        staffAverage = (staffTotal + booking_review.staffRating) / (staff_reviews.length + 1);
        staffAverage = +staffAverage.toFixed(1);
        serviceAverage = (serviceTotal + booking_review.serviceRating) / (service_reviews.length + 1);
        serviceAverage = +serviceAverage.toFixed(1);
        yield docBranchSnapshot.ref.update({
            totalAverageRating: totalAverage,
            branchOverallAverage: branchAverage,
            branchPunctAvergae: branchPunctAverage,
            staffRatingAveragew: branchStaffAverage,
            servicesAverageRating: branchServicesAverage,
            reviewsNo: branch_reviews.length + 1
        });
        yield docStaffBranchSnapshot.ref.update({ staffAverage: staffAverage });
        yield docServicePriceSnapshot.ref.update({ serviceAverage: serviceAverage });
    });
}
exports.onBookingDelete = functions.firestore.document('branch_bookings/{bookingId}').onDelete((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    let querySnapshot = yield admin.firestore().collection('bookings_logs').where('bookingId', '==', context.params.bookingId).get().catch(error => { return { empty: true }; });
    if (!querySnapshot.empty) {
        for (let doc of querySnapshot.docs) {
            yield doc.ref.delete();
        }
    }
    let querySnapshot2 = yield admin.firestore().collection('bookings_reviews').where('bookingId', '==', context.params.bookingId).get().catch(error => { return { empty: true }; });
    if (!querySnapshot2.empty) {
        for (let doc of querySnapshot2.docs) {
            yield doc.ref.delete();
        }
    }
    //we also need to call a function here that does recalculation of branch, staff and service reviews if necessary
}));
function initializeBookingLog(bookingLog) {
    bookingLog.id = '';
    bookingLog.bookingId = '';
    bookingLog.bookingItemId = '';
    bookingLog.bookingOrderId = '';
    bookingLog.bookingBranchId = '';
    bookingLog.clientId = '';
    bookingLog.staffId = '';
    bookingLog.staffName = '';
    bookingLog.staffArabicName = '';
    bookingLog.bookingStatus = 0;
    bookingLog.bookingStatusName = '';
    bookingLog.bookingStatusArabicName = '';
    bookingLog.bookingStatusDate = new Date();
    bookingLog.bookingNewStatus = 0;
    bookingLog.bookingNewStatusName = '';
    bookingLog.bookingNewStatusArabicName = '';
    bookingLog.bookingNewStatusDate = new Date();
    bookingLog.paymentType = 0;
    bookingLog.paymentDate = new Date();
    bookingLog.paymentAmount = 0;
    bookingLog.paymentCurrency = 'OMR';
    bookingLog.servicePrice = '';
    bookingLog.servicePriceName = '';
    bookingLog.servicePriceArabicName = '';
    bookingLog.packageId = '';
    bookingLog.packageName = '';
    bookingLog.packageArabicName = '';
    bookingLog.productType = 0;
}
function getStatusName(status, rtlSet) {
    let key = { key: 0, rtl: false };
    for (key of booking_1.InstanceStatusNames.keys()) {
        if (key.key == status && key.rtl == rtlSet) {
            break;
        }
    }
    return booking_1.InstanceStatusNames.get(key);
}
exports.onServiceCreate = functions.firestore.document('service_prices/{serviceId}').onCreate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const service2 = change.data();
    yield updateBranchServices(service2, null, false);
}));
exports.onServiceUpdate = functions.firestore.document('service_prices/{serviceId}').onUpdate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const service2 = change.after.data();
    const service2Previous = change.before.data();
    console.log('calling update service price');
    yield updateBranchServices(service2, service2Previous, false);
}));
exports.onServiceDelete = functions.firestore.document('service_prices/{serviceId}').onDelete((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const service2 = change.data();
    console.log('called delete services2');
    yield updateBranchServices(service2, null, true);
}));
function updateBranchServices(servicePrice, previousService2, deleteFlag) {
    return __awaiter(this, void 0, void 0, function* () {
        let docSnapshot = yield admin.firestore().collection('branches').doc(servicePrice.branch).get();
        let serviceId = servicePrice.service_type.id;
        let services = [];
        console.log('we are checking if standard services exist for branch ' + docSnapshot.id);
        console.log(docSnapshot.data().standardServices && docSnapshot.data().standardServices.length > 0);
        if (docSnapshot.data().standardServices && docSnapshot.data().standardServices.length > 0) {
            let serviceIndex = docSnapshot.data().standardServices.findIndex(service => { return service === serviceId; });
            services = docSnapshot.data().standardServices;
            console.log('new service id is ' + serviceId);
            console.log('old service id is ' + previousService2.service_type.id);
            if ((previousService2 && previousService2.service_type.id != serviceId) || !servicePrice.selected) {
                let serviceIndex2 = docSnapshot.data().standardServices.findIndex(service => { return service === previousService2.service_type.id; });
                if (serviceIndex2 != -1) {
                    services.splice(serviceIndex2, 1);
                }
            }
            if (serviceIndex == -1) {
                if (servicePrice.selected) {
                    services.push(serviceId);
                }
            }
            else if (deleteFlag) {
                services = docSnapshot.data().standardServices;
                services.splice(serviceIndex, 1);
            }
            yield docSnapshot.ref.update({ standardServices: services });
        }
        else if (!deleteFlag) {
            console.log('we are pushing this service type ' + serviceId + ' to branch ' + docSnapshot.id);
            if (servicePrice.selected) {
                services.push(serviceId);
            }
            yield docSnapshot.ref.update({ standardServices: services });
        }
    });
}
exports.onBranchCreated = functions.firestore.document('branches/{branchId}').onCreate((snap, context) => __awaiter(void 0, void 0, void 0, function* () {
    const branch = snap.data();
    const client = algoliasearch_1.default(functions.config().algolia.appid, functions.config().algolia.apikey);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    let branchData = {
        objectID: context.params.branchId,
        name: branch.name,
        arabicName: branch.arabicName
    };
    yield index.saveObject(branchData);
}));
exports.onBranchUpdate = functions.firestore.document('branches/{branchId}').onUpdate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const branch = change.after.data();
    const client = algoliasearch_1.default(functions.config().algolia.appid, functions.config().algolia.apikey);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    let branchData = {
        objectID: context.params.branchId,
        name: branch.name,
        arabicName: branch.arabicName
    };
    yield index.saveObject(branchData);
}));
exports.onBranchDelete = functions.firestore.document('branches/{branchId}').onDelete((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const client = algoliasearch_1.default(functions.config().algolia.appid, functions.config().algolia.apikey);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    yield index.deleteObject(context.params.branchId);
}));
exports.onStoreUpdate = functions.firestore.document('stores/{storeId}').onUpdate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const storeData = change.after.data();
    let querySnapshot = yield admin.firestore().collection('branches').where('storeId', '==', context.params.storeId).get().catch(error => { return { empty: true }; });
    if (!querySnapshot.empty) {
        for (let doc of querySnapshot.docs) {
            let branchData = doc.data();
            if (!branchData.storeLogoURL || storeData.logoURL != branchData.storeLogoURL) {
                console.log('update branch with logo url ' + storeData.logoURL);
                yield doc.ref.update({ storeLogoURL: storeData.logoURL });
            }
        }
    }
}));
exports.onPackageCreate = functions.firestore.document('branch_packages/{packageId}').onCreate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const packageData = change.data();
    yield updateBranchLastDateOffer(packageData);
}));
exports.onPackageUpdate = functions.firestore.document('branch_packages/{packageId}').onUpdate((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const packageData = change.after.data();
    yield updateBranchLastDateOffer(packageData);
}));
exports.onPackageDelete = functions.firestore.document('branch_packages/{packageId}').onDelete((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const packageData = change.data();
    yield updateBranchLastDateOffer(packageData);
}));
function updateBranchLastDateOffer(packageData) {
    return __awaiter(this, void 0, void 0, function* () {
        let dateArray1 = [];
        let dateArray2 = [];
        let querySnapshot = yield admin.firestore().collection('branch_packages').where('branch', '==', packageData.branch).get().catch(error => { return { empty: true }; });
        if (!querySnapshot.empty) {
            for (let doc of querySnapshot.docs) {
                if (isPackageValid(doc.data())) {
                    dateArray1.push(doc.data().end_date);
                    dateArray2.push(doc.data().start_date);
                }
            }
        }
        if (dateArray1.length > 0 && dateArray2.length > 0) {
            let start_date;
            let end_date;
            dateArray1.sort(function (a, b) {
                if (a > b)
                    return -1;
                if (a < b)
                    return 1;
                return 0;
            });
            end_date = dateArray1[0];
            dateArray2.sort(function (a, b) {
                if (b > a)
                    return -1;
                if (b < a)
                    return 1;
                return 0;
            });
            start_date = dateArray2[0];
            let docSnapshot = yield admin.firestore().collection('branches').doc(packageData.branch).get();
            if (docSnapshot.exists) {
                yield docSnapshot.ref.update({
                    package_validity: {
                        start_date: start_date,
                        end_date: end_date
                    }
                });
            }
        }
        else {
            let docSnapshot = yield admin.firestore().collection('branches').doc(packageData.branch).get();
            if (docSnapshot.exists) {
                let branchData = docSnapshot.data();
                if (branchData.last_date_offer) {
                    delete branchData.package_validity;
                }
                yield docSnapshot.ref.set(branchData);
            }
        }
    });
}
function isPackageValid(packageData) {
    let today = new Date();
    // today.setHours(today.getHours() + 4);
    today.setTime(today.getTime() + (4 * 60 * 60 * 1000));
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    if (!packageData) { //in case of branches that don't have package_validity
        return false;
    }
    if (packageData.start_date instanceof admin.firestore.Timestamp) {
        packageData.start_date = packageData.start_date.toDate();
    }
    packageData.start_date.setTime(packageData.start_date.getTime() + (4 * 60 * 60 * 1000));
    if (packageData.end_date instanceof admin.firestore.Timestamp) {
        packageData.end_date = packageData.end_date.toDate();
    }
    packageData.end_date.setTime(packageData.end_date.getTime() + (4 * 60 * 60 * 1000));
    console.log('package data in isPackageValid');
    console.log(packageData);
    console.log(packageData.start_date);
    console.log(today);
    if (packageData.start_date.getTime() <= today.getTime() && packageData.end_date.getTime() > today.getTime()) {
        return true;
    }
    else {
        return false;
    }
}
exports.sendPassReset = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let uid4 = uuid_1.v4();
        console.log(uid4);
        const email = request.body.email;
        const rtl = request.body.rtl;
        console.log(email);
        let userRec = yield admin.auth().getUserByEmail(email);
        if (userRec) {
            console.log(userRec.uid);
            let userId = userRec.uid;
            let validUntil = new Date();
            validUntil.setHours(validUntil.getHours() + 2);
            let data = {
                uid: userId,
                code: uid4,
                validTo: validUntil
            };
            console.log(data);
            let docRef = yield admin.firestore().collection('pass_rest_codes').add(data);
            console.log(docRef);
            console.log(docRef.id);
            //send the email here along with the rtl mode as a parameter
            console.log(rtl);
            yield sendPasswordResetLink(email, uid4, rtl);
            return response.status(201).send({
                uid: uid4
            });
        }
        else {
            return response.status(403).send('No Email Found');
        }
    }));
});
exports.checkPassResetCodeIsValid = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        const code = request.body.code;
        let result = yield validatePassResetCode(code);
        if (result && result.status == 'YES') {
            return response.status(201).send({
                valid: 'YES'
            });
        }
        else {
            return response.status(403).send({
                valid: 'NO'
            });
        }
    }));
});
exports.createOwner = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        console.log("email is " + request.body.email);
        const email = request.body.email;
        const branchId = request.body.branch;
        console.log('branch id is ' + branchId);
        // const name = request.body.name;
        // const phone = '+968' + request.body.phone;
        let password;
        password = Math.floor(Math.random() * 900000) + 100000;
        // password = request.body.password;
        // const serviceAccount = require('./serviceAccount.json');
        // let requestedUid = request.body.uid;
        let authToken = validateHeader(request);
        let isSuperAdmin;
        if (!authToken) {
            return response.status(403).send('Unuthorized! Missing auth token!');
        }
        return decodeAuthToken(authToken)
            .then((uid) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('uid is ' + uid);
            let querySnapshot = yield admin.firestore().collection('users').where('uid', '==', uid).get().catch(error => { return { empty: true }; }); // then(async (query: FirebaseFirestore.QuerySnapshot) => {
            console.log('query for super admin is ' + querySnapshot.empty);
            if (!querySnapshot.empty) {
                isSuperAdmin = querySnapshot.docs[0].get('superAdmin');
            }
            console.log('superadmin role is ' + isSuperAdmin);
            let isOwner;
            let isAdmin;
            isOwner = false;
            if (!isSuperAdmin) {
                let querySnapshot2 = yield admin.firestore().collection('stores').where('ownerId', '==', uid).get().catch(error => { return { empty: true }; });
                if (!querySnapshot2.empty) {
                    isOwner = true;
                }
            }
            if (!isSuperAdmin && !isOwner) {
                let querySnapshot3 = yield admin.firestore().collection('branch_staff').where('branch', '==', branchId).where('user', '==', uid).get().catch(error => { return { empty: true }; });
                if (!querySnapshot3.empty) {
                    const roles = querySnapshot3.docs[0].data().roles;
                    if (roles) {
                        let foundRole = roles.find(role => { return role === 'x6v73B0LHObIxrjsaPXs'; });
                        if (foundRole) {
                            isAdmin = true;
                        }
                    }
                }
            }
            console.log('email is ' + email);
            // console.log('name is ' + name);
            console.log('passowrd is :' + password);
            // console.log('phone number is ' + phone);
            console.log('SuperAdmin is ' + isSuperAdmin);
            console.log('Owner is ' + isOwner);
            console.log('isAdmin is ' + isAdmin);
            if (isSuperAdmin || isOwner || isAdmin) {
                console.log();
                admin.auth().createUser({
                    email: email,
                    password: '' + password,
                })
                    .then((userRecord) => __awaiter(void 0, void 0, void 0, function* () {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log("Successfully created new user:", userRecord.uid);
                    yield sendPassword(email, password);
                    response.status(201).send({
                        userId: userRecord.uid
                    });
                }))
                    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log("Error creating new user:", error.errorInfo.message);
                    console.log("Error code creating new user:", error.errorInfo.code);
                    if (error.errorInfo.code == 'auth/email-already-exists') {
                        let querySnapshot3 = yield admin.firestore().collection('staff_users').where('email', '==', email).get().catch(error2 => { return { empty: true }; });
                        if (querySnapshot3 && !querySnapshot3.empty) {
                            response.status(201).send({
                                userId: querySnapshot3.docs[0].data().uid
                            });
                        }
                        else {
                            response.status(500).json({
                                error: error.errorInfo.message
                            });
                        }
                    }
                    else {
                        response.status(500).json({
                            error: error.errorInfo.message
                        });
                    }
                }));
            }
            else {
                response.status(403).send('Unauthorized to create users');
            }
            // }).catch(error => {
            //     response.status(403).send('Unauthorized to create users');
            // });
        }))
            .catch(err => {
            response.status(403).send('Unauthorized to create users');
        });
    });
});
function sendPassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let emailArray = [];
        let strFirstThree = email.substring(0, 3);
        if (email != 'info@ontimeapps.net') {
            emailArray.push('info@ontimeapps.net');
            emailArray.push(email);
        }
        else {
            emailArray.push('info@ontimeapps.net');
        }
        let SENDGRID;
        let axios;
        if (!sendPasswordFunc) {
            SENDGRID = yield Promise.resolve().then(() => require('@sendgrid/mail'));
            axios = yield Promise.resolve().then(() => require('axios'));
            SENDGRID.setApiKey('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');
            sendPasswordFunc = true;
        }
        let msg;
        if (strFirstThree === '968') {
            let phoneNumber = email.substring(3, 8);
            msg = '<strong>لقد تم تسجيلك كمستخدم في تطبيق أون تيام آبز. الآن يمكنك تتبع حالات حجوزاتك بالصالونات' + '<br><br>' + '<p>قم بتنزيل تطبيق OntimeApps للأندرويد وآيفون من الروابط:</P>' + '<br><a href="https://play.google.com/store/apps/details?id=omanapps.store.client">أندرويد</a>' + '<br><a href="https://apps.apple.com/om/app/oa-salon/id1519223948?l=ar">آيفون</a>' + '</strong>';
            const today = new Date();
            today.setHours(today.getHours() + 4);
            // today.setMonth(today.getMonth() + 1);
            const timeToSend = moment(today).format('MM/DD/YYYY HH:mm:ss');
            console.log('Time to send is ' + timeToSend);
            let url = 'https://www.ismartsms.net/iBulkSMS/HttpWS/SMSDynamicAPI.aspx?UserId=futurewebs&Password=Bet@6789&MobileNo=' + phoneNumber + '&Message=';
            url = url + msg + '&PushDateTime=' + timeToSend + '&Lang=0&FLashSMS=N';
            console.log('url is ' + url);
            yield axios.get(url);
        }
        else {
            msg = {
                to: emailArray,
                from: 'info@ontimeapps.net',
                subject: 'Your OntimeApps Staff Password',
                text: 'Your password is ' + password,
                html: '<strong>Your password is ' + password + ' for email ' + email + '</strong>',
            };
        }
        SENDGRID.send(msg).then(status => {
            console.log('email was sent');
        }).catch(error => {
            console.log('email was not sent');
            console.error(error);
            if (error.response) {
                console.error(error.response.body);
            }
        });
    });
}
function sendPasswordResetLink(email, code, rtl) {
    return __awaiter(this, void 0, void 0, function* () {
        let rtlMode;
        let subject;
        let textString;
        let mess;
        let SENDGRID;
        if (!sendPasswordResetLinkFunc) {
            SENDGRID = yield Promise.resolve().then(() => require('@sendgrid/mail'));
            SENDGRID.setApiKey('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');
            sendPasswordResetLinkFunc = true;
        }
        let url;
        if (rtl) {
            rtlMode = 'true';
            url = 'https://admin.ontimeapps.net/passreset/' + code + '/' + rtlMode;
            subject = 'رابطك من أون تايم آبز لتغيير كلمة المرور';
            textString = 'إستخدم المتصفح للمشاهده';
            // mess = '<strong><p>الرجاء الضغط على الرابط التالي لتغيير كلمة المرور</p>' +
            //     'https://storeadmin-63722.firebaseapp.com/passreset/' + code + '/' + rtlMode +
            //     '</strong>';
            mess = '<p>:الرجاء الضغط غلى الرابط الآتي لتغيير كلمة المرور</p>' + '<p><br></p>' +
                '<p><a href="' + url + '" rel="noopener noreferrer" target="_blank">تغيير كلمة المرور</a></p>';
        }
        else {
            rtlMode = 'false';
            url = 'https://admin.ontimeapps.net/passreset/' + code + '/' + rtlMode;
            subject = 'Your OntimeApps Staff Reset Password Link';
            textString = 'Please view in html';
            mess = '<p>Please click on the following link to reset your password:</p>' +
                '<p><br></p>' +
                '<p><a href="' + url + '" rel="noopener noreferrer" target="_blank">Change Password</a></p>';
        }
        // https://storeadmin-63722.firebaseapp.com/passreset/2cacad25-8921-4d63-8a47-1a633f4d2ee0/true
        let emailArray = [];
        if (email != 'info@ontimeapps.net') {
            emailArray.push('info@ontimeapps.net');
            emailArray.push(email);
        }
        else {
            emailArray.push('info@ontimeapps.net');
        }
        const msg = {
            to: emailArray,
            from: 'info@ontimeapps.net',
            subject: subject,
            text: textString,
            html: mess,
        };
        SENDGRID.send(msg).then(status => {
            console.log('email was sent for password reset link');
        }).catch(error => {
            console.log('email was not sent');
            console.error(error);
            if (error.response) {
                console.error(error.response.body);
            }
        });
    });
}
exports.updateUser = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        const email = request.body.email;
        const password = request.body.password;
        const code = request.body.code;
        console.log("email is " + email);
        console.log("password is " + password);
        console.log("code is " + code);
        let updatePromise;
        let requestedUid;
        let result;
        if (code) {
            result = yield validatePassResetCode(code);
        }
        let authToken = validateHeader(request);
        console.log('auth token is ' + authToken);
        if (result && result.status == 'YES') {
            requestedUid = result.uid;
        }
        else if (authToken) {
            let uid = yield decodeAuthToken(authToken);
            if (uid) {
                requestedUid = uid;
            }
            else {
                return response.status(403).send({
                    valid: 'NOT ABLE TO UPDATE THE USER'
                });
            }
        }
        else {
            return response.status(403).send({
                valid: 'NOT ABLE TO UPDATE THE USER'
            });
        }
        console.log('uid is ' + requestedUid);
        if (email && password) {
            updatePromise = admin.auth().updateUser(requestedUid, {
                email: email,
                password: password
            });
        }
        else if (email) {
            updatePromise = admin.auth().updateUser(requestedUid, {
                email: email
            });
        }
        else if (password) {
            updatePromise = admin.auth().updateUser(requestedUid, {
                password: password
            });
        }
        else {
            return response.status(403).send('No fields were provided for update');
        }
        console.log('updating user ' + requestedUid + ' record');
        updatePromise
            .then(function (userRecord) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Successfully updated new user:", userRecord.uid);
                let querySnapshot2 = yield admin.firestore().collection('pass_rest_codes').where('uid', '==', requestedUid).get().catch(error => { return { empty: true }; });
                if (querySnapshot2 && !querySnapshot2.empty) {
                    for (let doc of querySnapshot2.docs) {
                        doc.ref.delete().then(result2 => { console.log(result2); }).catch(error2 => { console.log(error2); }); //no need to wait and let this happen in the background so jump to return ok immediately
                    }
                }
                return response.status(201).send({
                    status: 'OK'
                });
            });
        })
            .catch(function (error) {
            console.log("Error updating new user:", error);
            return response.status(500).json({
                error: error.errorInfo.message
            });
        });
        return true;
    }));
});
exports.deleteUser = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        console.log("email is " + request.body.email);
        // const email = request.body.email;
        // const password = request.body.password;
        // const name = request.body.name;
        // const phone = request.body.phone;
        // const serviceAccount = require('./serviceAccount.json');
        let requestedUid = request.body.uid;
        let authToken = validateHeader(request);
        if (!authToken) {
            return response.status(403).send('Unuthorized! Missing auth token!');
        }
        return decodeAuthToken(authToken)
            .then((uid) => __awaiter(void 0, void 0, void 0, function* () {
            yield admin.firestore().collection('staff_users').where('uid', '==', uid).get().then((query) => __awaiter(void 0, void 0, void 0, function* () {
                let isSuperAdmin = query.docs[0].get('superAdmin');
                if (isSuperAdmin) {
                    admin.auth().deleteUser(requestedUid)
                        .then(function () {
                        // See the UserRecord reference doc for the contents of userRecord.
                        response.status(201).send({
                            userId: requestedUid
                        });
                        console.log("Successfully deleted new user:", requestedUid);
                    })
                        .catch(function (error) {
                        response.status(500).json({
                            error: error.errorInfo.message
                        });
                        console.log("Error deleting user:", error);
                    });
                }
                else {
                    response.status(403).send('Unauthorized to delete users');
                }
            })).catch(error => {
                response.status(403).send('Unauthorized to delete users');
            });
        }))
            .catch(err => {
            response.status(403).send('Unauthorized to create users');
        });
    });
});
exports.updateEndUserEmail = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        const email = '968' + request.body['phoneNumber'] + '@omanapps.net';
        const requestedUid = request.body.uid;
        console.log("email is " + email);
        console.log("uid is " + requestedUid);
        let updatePromise;
        console.log('uid is ' + requestedUid);
        if (email) {
            updatePromise = admin.auth().updateUser(requestedUid, {
                email: email
            });
        }
        console.log('updating user ' + requestedUid + ' record');
        updatePromise
            .then(function (userRecord) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Successfully updated new user:", userRecord.uid);
                return response.status(201).send({
                    status: 'OK'
                });
            });
        })
            .catch(function (error) {
            console.log("Error updating new user:", error);
            return response.status(500).json({
                error: error.errorInfo.message
            });
        });
        return true;
    }));
});
exports.getSignInToken = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let token;
        let phoneNumber;
        let newUser = false;
        let email;
        let userRec = {};
        let docRef = {};
        let querySnapshot;
        let setOptions = { merge: true };
        let otpData = {};
        let axios;
        if (!getSignInTokenFunc) {
            axios = yield Promise.resolve().then(() => require('axios'));
            getSignInTokenFunc = true;
        }
        phoneNumber = '968' + request.body['phoneNumber'];
        if (request.body['phoneNumber'] == '11111111') {
            token = +'587436';
        }
        else if (request.body['phoneNumber'] == '22222222') {
            token = +'741359';
        }
        else {
            token = Math.floor(Math.random() * 900000) + 100000;
        }
        otpData.lastUpdate = Date.now();
        otpData.token = '' + token;
        querySnapshot = yield admin.firestore().collection('otps').where('phoneNumber', '==', phoneNumber).get().catch(error => { return { empty: true }; });
        if (!querySnapshot.empty) {
            docRef = querySnapshot.docs[0].ref;
            yield querySnapshot.docs[0].ref.set(otpData, setOptions);
        }
        else {
            otpData.phoneNumber = phoneNumber;
            docRef = yield admin.firestore().collection('otps').add(otpData);
        }
        if (docRef.id) {
            // let nexmo1;
            // nexmo1 = new Nexmo({
            //   apiKey: '5e0cd84f',
            //   apiSecret: '6wplD43V1MRQsndN',
            // });
            // const from = '(+44) 7507326672';
            // const to = phoneNumber;
            // const text = 'Your Token is ' + token;
            // nexmo1.message.sendSms(from, to, text);
            // response.status(201).send({
            //   result: 'ok'
            // });
            const today = new Date();
            today.setHours(today.getHours() + 4);
            // today.setMonth(today.getMonth() + 1);
            const timeToSend = moment(today).format('MM/DD/YYYY HH:mm:ss');
            console.log('Time to send is ' + timeToSend);
            let url = 'https://www.ismartsms.net/iBulkSMS/HttpWS/SMSDynamicAPI.aspx?UserId=futurewebs&Password=Bet@6789&MobileNo=' + phoneNumber + '&Message=';
            url = url + 'Your OntimeApps Token is ' + token + '&PushDateTime=' + timeToSend + '&Lang=0&FLashSMS=N';
            console.log('url is ' + url);
            yield axios.get(url);
            email = '968' + request.body['phoneNumber'] + '@omanapps.net';
            userRec = yield admin.auth().getUserByEmail(email).catch(error => { console.log('No User was found'); return {}; });
            if (!userRec.uid) {
                newUser = true;
            }
            // http.get(url, (resp) => {
            //   // resp.on('data', (chunk) => { console.log('');});
            //   resp.on('end', () => {
            //     console.log('sending is completed');
            //   });
            // }).on("error", (err) => { console.log("Error: " + err.message); });
            return response.status(201).send({
                result: 'ok',
                newUser: newUser
            });
            // try {
            //   const sentData = {
            //     "UserID": 'futurewebs',
            //     "Password": 'Bet@6789',
            //     "Message": 'Your Token is ' + token,
            //     "Language": '0',
            //     "ScheddateTime": timeToSend,
            //     "MobileNo": [phoneNumber],
            //     "RecipientType": "10"
            //   };
            //   console.log('data to be sent is ' + JSON.stringify(sentData));
            //   const res = await fetch('https://ismartsms.net/RestApi/api/SMS/PostSMS', {
            //     method: 'POST',
            //     headers: new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }),
            //     body: JSON.stringify(sentData)
            //   });
            //   let result = await res.json();
            //   console.log('Result of SMS sending is ' + JSON.stringify(result));
            //   return response.status(201).send({
            //     status: 'OK'
            //   });
            // } catch (error) {
            //   console.log('error was ' + JSON.stringify(error));
            //   return response.status(500).json({
            //     error: 'Could not send sms'
            //   });
            // }
        }
        else {
            return response.status(500).json({
                error: 'Could not store user token'
            });
        }
    }));
});
exports.getPass = functions.https.onRequest((request, response) => {
    // let query: firebase.firestore.QuerySnapshot = await this.dbf.collection('otps').where('phoneNumber', '==', phoneNumber).where('token', '==', optCode).orderBy('creattionTime', 'desc').limit(1).get();
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let userRec = {};
        let userRec2 = {};
        let token;
        let password;
        let phoneNumber;
        let otpPhoneNumber;
        let email;
        let email2;
        let querySnapshot;
        // let keepOtherSessions: boolean;
        let passwordToken;
        // let otpData: Partial<{
        //   lastUpdate: number,
        //   token: string,
        //   phoneNumber: string,
        //   pass: string
        // }> = {};
        let rtlSet = request.body['rtlSet'];
        let importedUser;
        // let setOptions: Partial<FirebaseFirestore.SetOptions> = { merge: true };
        console.log(request.body);
        email = '968' + request.body['phoneNumber'] + '@omanapps.net';
        console.log('email is ' + email);
        phoneNumber = '968' + request.body['phoneNumber'];
        otpPhoneNumber = '968' + request.body['phoneNumber2'];
        // phoneNumber = phoneNumber.substr(3);
        console.log('Phone number is ' + phoneNumber);
        // keepOtherSessions = request.body['keepOtherSessions'];
        token = request.body['otpCode'];
        console.log('token is ' + token);
        if (request.body['phoneNumber2']) {
            email2 = '968' + request.body['phoneNumber2'] + '@omanapps.net';
            console.log('Phone number is ' + otpPhoneNumber);
            console.log('token is ' + token);
            querySnapshot = yield admin.firestore().collection('otps').where('phoneNumber', '==', otpPhoneNumber).where('token', '==', token).get().catch(error => { return { empty: true }; });
        }
        else {
            querySnapshot = yield admin.firestore().collection('otps').where('phoneNumber', '==', phoneNumber).where('token', '==', token).get().catch(error => { return { empty: true }; });
        }
        if (querySnapshot.empty) {
            console.log('Could not validate OTP');
            response.status(500).json({
                error: 'Could not validate OTP'
            });
            return;
        }
        else {
            yield querySnapshot.docs[0].ref.delete();
        }
        password = Math.floor(Math.random() * 900000) + 100000;
        const updatedData = {};
        updatedData.password = '' + password;
        userRec = yield admin.auth().getUserByEmail(email).catch(error => { console.log('No User was found'); return {}; });
        if (userRec.uid) {
            userRec2 = userRec;
            if (request.body['phoneNumber2'] && email2) { //transfer ownership
                importedUser = [];
                importedUser[0] = {
                    uid: userRec.uid,
                    email: email2,
                    phoneNumber: otpPhoneNumber
                };
                console.log('trying ti impor user');
                // let result = await admin.auth().importUsers(importedUser);
                // if (result.successCount > 0) {
                //   console.log('import user was successful');
                // }
                let e164_phoneNumber = '+' + otpPhoneNumber;
                let result = yield admin.auth().updateUser(userRec.uid, { email: email2, phoneNumber: e164_phoneNumber });
                if (result.uid) {
                    console.log('successfully updated email and phone number');
                }
                // querySnapshot = await admin.firestore().collection('users').where('uid', '==', userRec.uid).get().catch(error => { return { empty: true }; });
                // if (!querySnapshot.empty) {
                //   await querySnapshot.docs[0].ref.update({ email: email2, phoneNumber: otpPhoneNumber });
                // }
            }
            // if (keepOtherSessions) {
            //   userRec2 = userRec;
            // }
            // else {
            // userRec2 = await admin.auth().updateUser(userRec.uid, updatedData).catch(error => { console.log('Not able to update user ' + userRec.uid); return {} });
            // if (userRec2) {
            //   await admin.auth().revokeRefreshTokens(userRec2.uid);
            // }
            // }
        }
        else {
            updatedData.email = email;
            updatedData.displayName = 'xxxxxx';
            updatedData.phoneNumber = phoneNumber;
            console.log('trying to create a new user...');
            console.log('password is ' + password);
            userRec2 = yield admin.auth().createUser({
                email: email,
                password: '' + password,
                displayName: 'xxxxxx',
                phoneNumber: '+' + phoneNumber
            }).catch(error => {
                console.log('error while creating a new user');
                console.log(error);
                return {};
            });
        }
        if (userRec2.uid) {
            if (!userRec.uid) {
                let data2 = {
                    email: email,
                    phoneNumber: '' + request.body['phoneNumber'],
                    uid: userRec2.uid,
                    createdBy: 'getPass',
                    rtlSet: rtlSet,
                    // mobiscroll.util.datetime.formatDate('yy-mm-dd HH:ii:ss', new Date())
                    createdAt: Date.now()
                };
                yield admin.firestore().collection('users').add(data2);
            }
            passwordToken = yield admin.auth().createCustomToken(userRec2.uid)
                .catch(function (error) {
                console.log('Error creating custom token:', error);
                return null;
            });
            console.log('custome tokenn is ' + password);
            response.status(201).send({
                pass: passwordToken
            });
            // otpData.lastUpdate = Date.now();
            // otpData.token = token;
            // otpData.phoneNumber = phoneNumber;
            // querySnapshot = await admin.firestore().collection('otps').where('phoneNumber', '==', phoneNumber).where('token', '==', token).get().catch(error => { return { empty: true }; });
            // console.log(querySnapshot.docs);
            // console.log('query snapshot empty value is ' + querySnapshot.empty);
            // if (!querySnapshot.empty) {
            //   if (!querySnapshot.docs[0].data().pass || !keepOtherSessions) {
            //     otpData.pass = password;
            //     await querySnapshot.docs[0].ref.set(otpData, setOptions);
            //   }
            //   else if (keepOtherSessions) {
            //     console.log('Password is ' + querySnapshot.docs[0].data().pass);
            //     otpData.pass = querySnapshot.docs[0].data().pass;
            //   }
            //   response.status(201).send({
            //     pass: passwordToken
            //   });
            // }
            // else {
            //   response.status(500).json({
            //     error: 'Could not validate OTP'
            //   });
            // }
        }
    }));
});
exports.sendPushNotification = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let uid = request.body.uid;
        let itemId = request.body.itemId;
        let bookingId = request.body.bookingId;
        let rtlSet = request.body.rtlSet;
        let title_text = '';
        let body_text = '';
        // let payload: any;
        let lang = '';
        console.log('ui is ' + uid);
        let docSnapshot;
        const querySnapshot = yield admin.firestore().collection('devices').where('userId', '==', uid).get().catch(error => { return { empty: true }; });
        if (querySnapshot.empty) {
            response.status(500).json({
                error: 'No Valid Token'
            });
            return null;
        }
        if (bookingId) {
            docSnapshot = yield admin.firestore().collection('branch_bookings').doc(bookingId).get();
            if (!docSnapshot.exists) {
                response.status(500).json({
                    error: 'No Such Booking'
                });
                return null;
            }
            if (docSnapshot.data().package) {
                if (rtlSet) {
                    title_text = 'حجزك للباقه';
                    body_text = 'تم تأكيد حجزك للباقه ' + docSnapshot.data().package.arabicName;
                    lang = 'ar';
                }
                else {
                    title_text = 'Package Booking';
                    body_text = 'Your Booking is Confirmed for Package ' + docSnapshot.data().package.name;
                    lang = 'en';
                }
            }
            else if (docSnapshot.data().service) {
                if (rtlSet) {
                    title_text = 'حجزك للخدمه';
                    body_text = 'تم تأكيد حجزك للخدمه ' + docSnapshot.data().service.arabicName;
                    lang = 'ar';
                }
                else {
                    title_text = 'Service Booking';
                    body_text = 'Your Booking is Confirmed for Service ' + docSnapshot.data().service.name;
                    lang = 'en';
                }
            }
            // payload = {
            //   notification: {
            //     title: title_text,
            //     body: body_text
            //   },
            //   data: {
            //     booking_id: bookingId
            //   }
            // };
        }
        else if (itemId) {
            docSnapshot = yield admin.firestore().collection('branch_lineitems').doc(itemId).get();
            if (!docSnapshot.exists) {
                response.status(500).json({
                    error: 'No Such Item'
                });
                return null;
            }
            if (docSnapshot.data().package.id) {
                if (rtlSet) {
                    title_text = 'حجزك للباقه';
                    body_text = 'تم تأكيد حجزك للباقه ' + docSnapshot.data().package.arabicName;
                    lang = 'ar';
                }
                else {
                    title_text = 'Package Booking';
                    body_text = 'Your Booking is Confirmed for Package ' + docSnapshot.data().package.name;
                    lang = 'en';
                }
            }
            else if (docSnapshot.data().service.id) {
                if (rtlSet) {
                    title_text = 'حجزك للخدمه';
                    body_text = 'تم تأكيد حجزك للخدمه ' + docSnapshot.data().service.arabicName;
                    lang = 'ar';
                }
                else {
                    title_text = 'Service Booking';
                    body_text = 'Your Booking is Confirmed for Service ' + docSnapshot.data().service.name;
                    lang = 'en';
                }
            }
            // payload = {
            //   notification: {
            //     title: title_text,
            //     body: body_text
            //   }
            // };
        }
        const tokens = querySnapshot.docs[0].data().tokens;
        let sentData;
        if (bookingId) {
            sentData = {
                app_id: "8582ffd3-314f-4fc5-9c0b-391690c01872",
                contents: { 'en': body_text, 'ar': body_text },
                headings: { 'en': title_text, 'ar': title_text },
                data: { booking_id: bookingId },
                include_player_ids: tokens
            };
        }
        else {
            sentData = {
                app_id: "8582ffd3-314f-4fc5-9c0b-391690c01872",
                contents: { 'en': body_text, 'ar': body_text },
                headings: { 'en': title_text, 'ar': title_text },
                include_player_ids: tokens
            };
        }
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MWNmNzRhYTgtOGU5Mi00MzE0LTk3ZTAtYzI5ODVjOGJkMTVm"
        };
        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        var req = http.request(options, (res) => {
            res.on('data', (data) => {
                console.log("Response:");
                console.log(JSON.parse(data.toString()));
            });
        });
        req.on('error', (e) => {
            console.log("ERROR:");
            console.log(e);
            console.log(JSON.stringify(sentData));
        });
        req.write(JSON.stringify(sentData));
        req.end();
        return response.status(201).send({
            status: 'OK'
        });
        // const messResponse: admin.messaging.MessagingDevicesResponse = await admin.messaging().sendToDevice(tokens, payload);
        // console.log('send notification response is ' + JSON.stringify(messResponse));
        // // if (messResponse.successCount == 1) {
        // return response.status(201).send({
        //   status: 'OK'
        // });
        // }
        // else {
        //   return response.status(500).json({
        //     error: 'Not Sent'
        //   });
        // }
    }));
});
function validateHeader(req) {
    if (req.headers.authorization && req.headers.authorization.toString().startsWith('Bearer ')) {
        console.log('auth header found');
        console.log(req.headers.authorization.toString());
        return req.headers.authorization.toString().split('Bearer ')[1];
    }
    return null;
}
function decodeAuthToken(authToken) {
    return admin.auth()
        .verifyIdToken(authToken)
        .then(decodedToken => {
        console.log('UID after decoding is ' + decodedToken.uid);
        return decodedToken.uid;
    });
}
function validatePassResetCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        let querySnapshot = yield admin.firestore().collection('pass_rest_codes').where('code', '==', code).get().catch(error => { return { empty: true }; });
        let validTo;
        if (querySnapshot && !querySnapshot.empty) {
            let currentTime = new Date();
            for (let doc of querySnapshot.docs) {
                validTo = doc.data().validTo;
                if (validTo instanceof admin.firestore.Timestamp) {
                    validTo = doc.data().validTo.toDate();
                }
                console.log(validTo);
                console.log(currentTime);
                console.log(validTo.getTime());
                console.log(currentTime.getTime());
                if (validTo.getTime() > currentTime.getTime()) {
                    console.log('we got a valid code');
                    return {
                        status: 'YES',
                        uid: doc.data().uid
                    };
                }
            }
            return {
                status: 'NO',
                uid: ''
            };
        }
        else {
            return {
                status: 'NO',
                uid: ''
            };
        }
    });
}
exports.writeBookingLock = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let authToken = validateHeader(request);
        console.log(authToken);
        if (!authToken) {
            return response.status(403).send('Unuthorized! Missing auth token!');
        }
        return decodeAuthToken(authToken)
            .then((uid) => __awaiter(void 0, void 0, void 0, function* () {
            let bookingId = request.body['booking_id'];
            let userId = request.body['user_id'];
            let docRef = yield admin.firestore().collection('bookings_locks').add({
                booking_id: bookingId,
                user_id: userId,
                start_time: new Date()
            });
            if (docRef) {
                response.status(201).send({
                    lock_id: docRef.id
                });
            }
            else {
                response.status(500).json({
                    error: 'Could not obtain lock'
                });
            }
        }))
            .catch(error => {
            response.status(403).send('Unauthorized to create locks');
        });
    }));
});
exports.checkBookingLock = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let bookingId = request.body['booking_id'];
        let userId = request.body['user_id'];
        let querySnapshot;
        querySnapshot = yield admin.firestore().collection('bookings_locks').get().catch(error => { return { empty: true }; });
        let startTime;
        if (!querySnapshot.empty) {
            for (const doc of querySnapshot.docs) {
                // firebase.firestore.Timestamp
                if (doc.data().start_time instanceof admin.firestore.Timestamp) {
                    startTime = doc.data().start_time.toDate();
                }
                let timePlusMinute = startTime.getMinutes() + 1;
                let startTimeAdvanced = new Date(startTime);
                startTimeAdvanced.setMinutes(timePlusMinute);
                // startTime.setMinutes(timePlusMinute);
                let currentTime = new Date();
                console.log(currentTime);
                console.log(startTime);
                console.log(startTimeAdvanced);
                if (currentTime.getTime() < startTimeAdvanced.getTime()) {
                    if (doc.data().booking_id === bookingId && doc.data().user_id === userId) {
                        console.log('we found a valid lock that matches');
                        response.status(201).send({
                            lock_status: 'OK',
                            obtain_lock: 'NO'
                        });
                        return;
                    }
                    else {
                        console.log('we found a valid lock that does not match');
                        response.status(201).send({
                            lock_status: 'NO'
                        });
                        return;
                    }
                }
            }
            console.log('no valid lock was found');
            response.status(201).send({
                lock_status: 'OK',
                obtain_lock: 'YES'
            });
        }
        else {
            response.status(201).send({
                lock_status: 'OK',
                obtain_lock: 'YES'
            });
        }
    }));
});
exports.deleteBookingLock = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(void 0, void 0, void 0, function* () {
        let authToken = validateHeader(request);
        if (!authToken) {
            return response.status(403).send('Unuthorized! Missing auth token!');
        }
        return decodeAuthToken(authToken)
            .then((uid) => __awaiter(void 0, void 0, void 0, function* () {
            let bookingId = request.body['booking_id'];
            let userId = request.body['user_id'];
            let query = yield admin.firestore().collection('bookings_locks').where('booking_id', '==', bookingId).where('user_id', '==', userId).get().catch(error => { return { empty: true }; });
            ;
            if (!query.empty) {
                for (const doc of query.docs) {
                    yield doc.ref.delete();
                }
                response.status(201).send({
                    status: 'lock was deleted'
                });
            }
            else {
                response.status(201).send({
                    status: 'No locks found to be deleted'
                });
            }
        }))
            .catch(error => {
            response.status(403).send('Unauthorized to delete locks');
        });
    }));
});
//     //  response.send("Hello from Firebase!");
// });
// exports.createNewOwner = functions.firestore
//     .document('users/{newUserId}')
//     .onCreate(async (event: functions.Event<DeltaDocumentSnapshot>) => {
//         const id: string = event.data.id;
//         const email: string = event.data.data().email;
//         const phoneNumber: string = event.data.data().phoneNumber;
//         const password: string = event.data.data().password;
//         const name: string = event.data.data().name;
// admin.initializeApp({
//     credential: admin.credential.cert({
//         "projectId": "requestordev",
//         "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMzSUiPUt2l7V9\ng23Ix1YqjtfTWua4dAIiowPLCAUPoCy45N0Wu6ND76WJwuOUBv4L4L02HldzD1WJ\nrNmrpeEesBC9VCiVHLooyM5nUhNKIJ7dajL8A4arEH7Sj+xixSYPyafjCbdOsb1x\n/wkzzDef5zM7Gne0XXGUjhdPNwbV67ydG2kzjzNw+S1s6nxmiRMfJe5FjGg3I95u\ncV9rTTJd5XT/kvGIVmmDEdAf7ZEMmQFmnDYbHO2Nie2iyChN6V0IMYgJRgAy88EY\npTa4xwhe/x2vuBMny099OUQBlhIHNKTvyLAaJya8ti6lmt761+YeRKvt/U3Xjevm\nX6Ic67BNAgMBAAECggEAAbQyOyTx6Ahult79TpaT+bIrCwPeWAoFC4c6LJoCOsVN\nIfOrgDkq7FGF2c3QiWZ+fhhOUrExbpBh2I2i2Pn+E7yIwx58YPM2fEjhaLwm027O\ni46K4oxf9jPirjtKzu6PeMGnfyzRRNsXNafWyoLIMrEgfL0lYk+FtqPw/zR4vtZd\nq7eoYZp4pZDnM6FgwrDQ7s1yDQ1UiHmJeD6MkaJA0/rOPeK1/6OwN6WRICe2V4NB\nHKH290/7ocVI1E5JXt3zGl7QjPhvGyffniagNO7tkQ02zumUigJhYVmbFbU2odto\nw1plMFoQD9ymOaCKiMP5darnXkxiDAz2OomnoM6wuQKBgQD/2zEY+PwxK4QrW5FP\nJwnHRc+npbtYU0nx99GlshYaZfGH0qdUm0NVwQ/79nMbuXRydRWho9CzWhjw4EzM\nUBkY5tPgrdifsao2a4QrIZc13gDxvuVU/i/5Zh/PG8iBVqQ2ooYXicJHlhRebcsJ\nqmsWCZx2AAGGXXcqV2ow//zeuQKBgQDM6pu92qD6CZI6CoDIvaRUXJ88aeD8QyD2\niwnsHCFlkCDlOK4pYTC5OE6zTzuLo2I9iWBEwQjg/hLr0KFOic/PirElZ2gtK0Je\n4hG8VUZb2E6kE2JvekhnAHPAG03vBytQAzzxL3CIU7khbkRuOvDfvhjCN9Av+VJe\nuhdJOPQ0NQKBgQCk0KUjChki735Xk8faLjKdXHo064zwi86hgVtamoqkfLEHJorF\n9LJ+hjxuucZSwLejl4rUsjsZndtdJ5AxORPBt8ga/sIBtSgJoF7mjd/jQlxnXepL\nQubSiJfLCYGy14Y276DjfslY5fO/FIjrdA1Bh/VzCfPxgznlW6Q7ZluVeQKBgDTI\nRZ+MniRprLm4lN2gQ6DbTsTv/NzdqbL3s3GW+V9A1chVZj8QYs2C3HrBcPQR/K8f\nIKX1FwVlTJhjX/lr9BRghCq/TQ09dFYeYzUgvgPQXslSmOtgEyA89JPKNLPaI+Tz\nQJJbhuAGuMwMrCG8muj2/UehusVwsi/mPTNGMVj1AoGAcS2GlFwWY0GjXuLPThUs\n2mvGRwqKrOmDfM5KmDp5KjtNVMs9drMafzlwrUQvp8Vu8Wsy3Li9kFJkiXFff+/A\nIPLZ7h5TRNSpqfNX8EQsfRuKZ8BsXZn8R1WdeJY+80jmYSHIPh6ZFOLt+7OEcdVY\nbghj3XjY1OZjjrt0S4Jt1bo=\n-----END PRIVATE KEY-----\n",
//         "clientEmail": "firebase-adminsdk-abhf3@requestordev.iam.gserviceaccount.com"
//     }),
//     databaseURL: 'https://requestordev.firebaseio.com"'
// });
//      admin.initializeApp(functions.config().firebase);
//      await admin.auth().createUser({
//         uid: id,
//         email: email,
//         password: password,
//     })
//         .then(async (success) => {
//             // admin
//             // .firestore().collection('users').doc(id)
//             // .update({
//             //     uid: id
//             // }).then((res) => { console.log(); })
//             // .catch((err) => { console.log(); });
//             return await event.data.ref.set({
//                 uid: id
//             }, { merge: true });
//         })
//         .catch((error) => { console.log(error); });
// });
//# sourceMappingURL=index.js.map