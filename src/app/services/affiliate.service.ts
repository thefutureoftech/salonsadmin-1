import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AffiliatedUser } from '../model/affiliatedUser';
import { User } from '../model/user';
import * as _ from 'lodash';
import { environment } from '../../environments/environment.prod';
import { AffiliateDashboard } from '../model/affiliateDashboard';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  dbf: firebase.firestore.Firestore;

  constructor() {

    this.dbf = firebase.firestore();

  }


  async getAffiliatesData(listType: string, affiliatedId?: string) {

    let affiliatedUsers: Partial<AffiliatedUser>[] = [];

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>

    let docSnapshot: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>;

    if (affiliatedId) {

      docSnapshot = await this.dbf.collection('users_affiliated').doc(affiliatedId).get();

    }
    else {

      querySnapshot = await this.dbf.collection('users_affiliated').get().catch(error => { return { empty: true } });

    }

    if (querySnapshot && !querySnapshot.empty) {

      for (let doc of querySnapshot.docs) {

        let affiliateData: Partial<AffiliatedUser>;

        affiliateData = await this.getAffiliate(listType, doc);

        if (affiliateData) {

          affiliatedUsers.push(affiliateData);

        }

      }

      return affiliatedUsers;

    }
    else if (docSnapshot && docSnapshot.id) {

      let affiliateData: Partial<AffiliatedUser>;

      affiliateData = await this.getAffiliate(listType, docSnapshot);

      if (affiliateData) {

        affiliatedUsers.push(affiliateData);

      }

      return affiliatedUsers;

    }
    else {

      return null;

    }

  }



  async getAffiliate(listType: string, doc) {

    console.log(doc.data());

    let affiliateData: Partial<AffiliatedUser> = doc.data();

    if (listType === 'requests' && !doc.data().isRequesting) {

      return null;

    }

    if (affiliateData.lastPaymentDate instanceof firebase.firestore.Timestamp) {

      affiliateData.lastPaymentDate = affiliateData.lastPaymentDate.toDate();

    }

    let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users').where('uid', '==', affiliateData.userId).get().catch(error => { return { empty: true } });

    if (!querySnapshot2.empty) {

      affiliateData.phoneNumber = querySnapshot2.docs[0].data().phoneNumber;

    }

    let obj = { id: doc.id, ...affiliateData };

    return obj;

  }



  async getUserByPhoneNumber(phoneNumber: string) {

    let user: Partial<User> = {};

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users').where('phoneNumber', '==', phoneNumber).get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      user = querySnapshot.docs[0].data();

      user.id = querySnapshot.docs[0].id;

      let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users_affiliated').where('userId', '==', user.uid).get().catch(error => { return { empty: true } });

      if (!querySnapshot2.empty && querySnapshot2.docs[0].data().active) {

        user.affiliate = true;

      }

      return user;

    }
    else {

      return null;

    }


  }


  async toggleAffiliate(userId: string, toggleValue: boolean) {

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users_affiliated').where('userId', '==', userId).get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      await querySnapshot.docs[0].ref.update({ active: toggleValue });

    }
    else {

      let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users').where('uid', '==', userId).get().catch(error => { return { empty: true } });

      if (!querySnapshot2.empty) {

        console.log('Making affiliate for user id ' + querySnapshot2.docs[0].data().uid);

        let userData: Partial<User> = querySnapshot2.docs[0].data();

        let affiliateData: Partial<AffiliatedUser> = {

          userId: userId,
          userName: userData.name,
          userArabicName: userData.arabicName,
          lastUpdated: new Date(),
          readyToPayAmount: 0,
          totalPaidAmount: 0,
          currency: 'OMR',
          active: toggleValue

        }

        let docRef: Partial<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> = await this.dbf.collection('users_affiliated').add(affiliateData);

      }

    }

  }


  async saveAffiliate(affiliate: Partial<AffiliatedUser>, listType: string) {

    let affiliateData = _.cloneDeep(affiliate);

    delete affiliate.phoneNumber;

    delete affiliateData.earning;

    let docSnapshot: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users_affiliated').doc(affiliateData.id).get();

    if (docSnapshot && docSnapshot.exists) {

      let oldActive = docSnapshot.data().active;

      await docSnapshot.ref.update(affiliateData);

      if (!oldActive) {

        if (affiliateData.active) {

          this.sendAffiliateNotification(affiliateData.id, listType);

        }

      }

    }

  }


  async transferMoneyToAffiliate(affiliate: Partial<AffiliatedUser>, listType: string) {

    let affiliateData = _.cloneDeep(affiliate);

    delete affiliate.phoneNumber;

    delete affiliateData.earning;

    affiliateData.totalPaidAmount = affiliate.totalPaidAmount + affiliateData.readyToPayAmount;

    let transferAmount = affiliateData.readyToPayAmount;

    affiliateData.readyToPayAmount = 0;

    affiliateData.isRequesting = false;

    let docSnapshot: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users_affiliated').doc(affiliateData.id).get();

    if (docSnapshot && docSnapshot.exists) {

      await docSnapshot.ref.update(affiliateData);

      this.sendAffiliateNotification(affiliateData.id, listType, transferAmount);

    }

  }


  async sendAffiliateNotification(affiliateId: string, listType?: string, transferAmount?: number) {

    let res: Response;

    try {

      let url = environment.apiURL + 'sendAffiliateNewTransferTransferNotification';


      if (listType === 'requests') {

        res = await fetch(url, {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' }),
          body: JSON.stringify({
            affiliateId: affiliateId,
            affiliateType: listType,
            transferAmount: transferAmount
          })
        });

      }
      else if (listType === 'members') {

        res = await fetch(url, {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' }),
          body: JSON.stringify({
            affiliateId: affiliateId,
            affiliateType: listType
          })
        });

      }

      let result = await res.json();

    }
    catch (error) {

    }

  }


  async getAffiliatedDashboard() {

    let dashboard: Partial<AffiliateDashboard> = {};

    dashboard.totalCommission = 0;

    dashboard.totalRedaToPay = 0;

    dashboard.tottalPaid = 0;

    dashboard.topAffiliates = [];

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users_affiliated').get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      for (let doc of querySnapshot.docs) {

        let user: Partial<AffiliatedUser>;

        user = doc.data();

        user.id = doc.id;

        if (user.readyToPayAmount === 0 && user.totalPaidAmount === 0) {

          continue;

        }

        let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('users').where('uid', '==', user.userId).get().catch(error => { return { empty: true } });

        if (!querySnapshot2.empty) {

          user.phoneNumber = querySnapshot2.docs[0].data().phoneNumber;

        }

        dashboard.totalRedaToPay = dashboard.totalRedaToPay + user.readyToPayAmount;

        dashboard.tottalPaid = dashboard.tottalPaid + user.totalPaidAmount;

        dashboard.totalCommission = dashboard.totalCommission + user.readyToPayAmount + user.totalPaidAmount;

        user.earning = user.readyToPayAmount + user.totalPaidAmount;

        dashboard.topAffiliates.push(user);

      }

      dashboard.topAffiliates.sort(function compare(a, b) {
        return b.earning - a.earning;
      });

      return dashboard;

    }
    else {

      return null;

    }


  }




}
