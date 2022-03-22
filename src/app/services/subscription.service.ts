import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { environment } from '../../environments/environment.prod';
import { Invoice } from '../model/invoice';
import { PlanPricing } from '../model/planPricing';
import { SignUpFormDetails } from '../model/signupDetails';
import { SubscriptionDashboard } from '../model/SubscriptionDashboard';
import { SearchIndex } from 'algoliasearch';
import algoliasearch from 'algoliasearch';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  dbf: firebase.firestore.Firestore;

  dashboard: Partial<SubscriptionDashboard>;

  signupFormDetails: Partial<SignUpFormDetails>[];

  algoliaIndex: SearchIndex;

  constructor() {

    this.dbf = firebase.firestore();

    const client = algoliasearch('4GLVRF37UR', '7037d91ad362bdb4975795e21898a054');

    this.algoliaIndex = client.initIndex('BRANCHES');

  }


  async getDashboardData() {

    this.dashboard = {};

    this.dashboard.branchesNumber = 0;

    this.dashboard.monthlyBranches = 0;

    this.dashboard.yearlyBranches = 0;

    this.dashboard.activeBranches = 0;

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branches').get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      for (let doc of querySnapshot.docs) {

        let branchData = doc.data();

        branchData.id = doc.id;

        this.dashboard.branchesNumber++;

        if (branchData.active) {

          this.dashboard.activeBranches++;

        }

        let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branch_invoices').where('branchId', '==', doc.id).get().catch(error => { return { empty: true } });

        if (!querySnapshot2.empty) {

          let invoices: Partial<Invoice>[] = [];

          for (let doc of querySnapshot2.docs) {

            let invoiceData = doc.data();

            invoiceData.id = doc.id;

            invoices.push(invoiceData);

          }

          if (invoices && invoices.length > 1) {

            invoices.sort(function compare(a, b) {
              let dateA = new Date(a.paymentDate);
              let dateB = new Date(b.paymentDate);
              return dateB.getTime() - dateA.getTime();
            });

          }

          if (invoices[0].package === 'card1') {

            this.dashboard.monthlyBranches++;

          }
          else {

            this.dashboard.yearlyBranches++;

          }

        }

      }

      return this.dashboard;

    }
    else {

      return null;

    }

  }


  async searchSignUpFormByEmailOrPhone(email: string) {

    this.signupFormDetails = [];

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>;

    querySnapshot = await this.dbf.collection('staff_users').where('email', '==', email).get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('stores').where('ownerId', '==', querySnapshot.docs[0].data().uid).get().catch(error => { return { empty: true } });

      if (!querySnapshot2.empty) {

        let querySnapshot3: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branches').where('storeId', '==', querySnapshot2.docs[0].id).get().catch(error => { return { empty: true } });

        if (!querySnapshot3.empty) {

          for (let doc of querySnapshot3.docs) {

            let signUpFormDetailsData = await this.getBranchSignUpFormDetails(doc.id);

            if (signUpFormDetailsData) {

              signUpFormDetailsData.ownerName = querySnapshot.docs[0].data().name;

              signUpFormDetailsData.ownerPhoneNumber = querySnapshot.docs[0].data().phoneNumber;

              signUpFormDetailsData.active = doc.data().active;

              signUpFormDetailsData.ownerEmail = querySnapshot.docs[0].data().email;

              this.signupFormDetails.push(signUpFormDetailsData);

            }

          }

        }

      }

    }

    if (this.signupFormDetails.length > 0) {

      return this.signupFormDetails;

    }
    else {

      return null;

    }

  }


  async searchSignUpFormByBranchName(searchTerm: string) {

    this.signupFormDetails = [];

    let searchIds: string[] = [];

    let hits = await this.algoliaIndex.search(searchTerm);

    for (let hit of hits.hits) {

      searchIds.push(hit['objectID']);

    }

    if (searchIds.length > 0) {

      for (let branchId of searchIds) {

        let docSnapshot: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branches').doc(branchId).get();

        if (docSnapshot.exists) {

          let signUpFormDetailsData = await this.getBranchSignUpFormDetails(docSnapshot.id);

          if (signUpFormDetailsData) {

            let docSnapshot2: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('stores').doc(docSnapshot.data().storeId).get();

            if (docSnapshot2.exists) {

              console.log('we have store data');

              //Assuming owner has only ONE store

              let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>;

              querySnapshot = await this.dbf.collection('staff_users').where('uid', '==', docSnapshot2.data().ownerId).get().catch(error => { return { empty: true } });

              if (!querySnapshot.empty) {

                console.log('we have staff users data');

                signUpFormDetailsData.ownerPhoneNumber = querySnapshot.docs[0].data().phoneNumber;

                signUpFormDetailsData.ownerName = querySnapshot.docs[0].data().name;

                signUpFormDetailsData.ownerEmail = querySnapshot.docs[0].data().email;

              }

            }

            signUpFormDetailsData.active = docSnapshot.data().active;

            this.signupFormDetails.push(signUpFormDetailsData);

          }

        }

      }

    }


    if (this.signupFormDetails.length > 0) {

      return this.signupFormDetails;

    }
    else {

      return null;

    }

  }


  async getBranchSignUpFormDetails(branchId: string) {

    let signupFormDetails: Partial<SignUpFormDetails> = {};

    let docSnapshot: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branches').doc(branchId).get();

    if (docSnapshot && docSnapshot.exists) {

      let branchData = docSnapshot.data();

      branchData.id = docSnapshot.id;

      signupFormDetails.branchData = branchData;

    }

    let querySnapshot2: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branch_invoices').where('branchId', '==', branchId).get().catch(error => { return { empty: true } });

    if (!querySnapshot2.empty) {

      let invoices: Partial<Invoice>[] = [];

      for (let doc of querySnapshot2.docs) {

        let invoiceData = doc.data();

        invoiceData.id = doc.id;

        if (invoiceData.paymentDate instanceof firebase.firestore.Timestamp) {

          invoiceData.paymentDate = invoiceData.paymentDate.toDate();

        }

        invoices.push(invoiceData);

      }

      if (invoices && invoices.length > 1) {

        invoices.sort(function compare(a, b) {
          let dateA = new Date(a.paymentDate);
          let dateB = new Date(b.paymentDate);
          return dateB.getTime() - dateA.getTime();
        });

      }

      signupFormDetails.invoice = invoices[0];

      if (signupFormDetails.invoice.nextPaymentDate instanceof firebase.firestore.Timestamp) {

        signupFormDetails.invoice.nextPaymentDate = signupFormDetails.invoice.nextPaymentDate.toDate();

      }

    }

    if (signupFormDetails.branchData || signupFormDetails.invoice) {

      return signupFormDetails;

    }
    else {

      return null;

    }

  }


  async saveSignUpDetails(signupDetail: Partial<SignUpFormDetails>) {

    let docSnapshot: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('branches').doc(signupDetail.branchData.id).get();

    if (docSnapshot && docSnapshot.exists) {

      let oldActive = docSnapshot.data().active;

      await docSnapshot.ref.update(signupDetail.branchData);

      if (!oldActive) {

        if (signupDetail.branchData.active) {

          await this.sendBranchOwnerActivationEmail(signupDetail.ownerEmail, signupDetail.branchData.id);

        }

      }

    }

  }


  async getPlanPricingData() {

    let planPricingData: Partial<PlanPricing> = {};

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('plan_pricing').get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      planPricingData = querySnapshot.docs[0].data();

      planPricingData.id = querySnapshot.docs[0].id;

      if (planPricingData.freePeriod.from_date instanceof firebase.firestore.Timestamp) {

        planPricingData.freePeriod.from_date = planPricingData.freePeriod.from_date.toDate();

      }

      if (planPricingData.freePeriod.to_date instanceof firebase.firestore.Timestamp) {

        planPricingData.freePeriod.to_date = planPricingData.freePeriod.to_date.toDate();

      }

      return planPricingData;

    }
    else {

      return null;

    }


  }


  async savPlanPricingData(planPricing: Partial<PlanPricing>) {

    let planPricingData: Partial<PlanPricing> = {};

    planPricingData = _.cloneDeep(planPricing);

    delete planPricingData.id;

    planPricingData.freePeriod.days = +planPricing.freePeriod.days;

    planPricingData.freePeriod.period = +planPricing.freePeriod.period;

    planPricingData.package1.days = +planPricingData.package1.days;

    planPricingData.package1.period = +planPricingData.package1.period;

    planPricingData.package1.price = +planPricingData.package1.price;

    planPricingData.package1.affiliate_discount = +planPricingData.package1.affiliate_discount;

    planPricingData.package2.days = +planPricingData.package2.days;

    planPricingData.package2.period = +planPricingData.package2.period;

    planPricingData.package2.price = +planPricingData.package2.price;

    planPricingData.package2.affiliate_discount = +planPricingData.package2.affiliate_discount;

    console.log(planPricingData);

    let querySnapshot: Partial<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> = await this.dbf.collection('plan_pricing').get().catch(error => { return { empty: true } });

    if (!querySnapshot.empty) {

      await querySnapshot.docs[0].ref.update(planPricingData);

    }

  }


  async renewBranchSubscription(branchId: string, selectedPackage: string, token: string) {

    let res: Response;

    try {

      let url = environment.apiURL + 'renewBranchSubscription';

      res = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }),
        body: JSON.stringify({
          branchId: branchId,
          subsciption_package: selectedPackage
        })
      });


      let result = await res.json();

    }
    catch (error) {

    }

  }


  async sendBranchOwnerActivationEmail(ownerEmail: string, branchId: string) {

    let res: Response;

    try {

      let url = environment.apiURL + 'sendBranchOwnerActivationEmail';

      res = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          ownerEmail: ownerEmail,
          branchId: branchId
        })
      });


      let result = await res.json();

    }
    catch (error) {

    }

  }


  async testPushNotification() {


    let res: Response;

    try {

      let url = environment.apiURL + 'sendTestPushNotification';

      res = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          userId: 'vo54WeAJR0W3gN3zgGKfoPjTXox1'
        })
      });


      let result = await res.json();

    }
    catch (error) {

    }


  }


}

