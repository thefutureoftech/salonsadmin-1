import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, tap, map, take } from 'rxjs/operators';
import { User } from '../model/user';
import { UserDBService } from './user.dbservice';
import { of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<User>;

  private loggedInUser: User;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userDBService: UserDBService) {


    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {

        return this.afs.collection<any>('users', ref => ref.where('uid', '==', user.uid)).valueChanges().pipe(map((data: User[]) => {

          console.log('user record is');
          console.log(data[0]);

          return data[0];

        }));

        // return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {

        return of(null)
      }
    }));



  }


  login(username: string, password: string) {

    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {

      return this.afAuth.auth.signInWithEmailAndPassword(username, password)

        .then(result => {

          return true;

        })

        .catch(error => {

          return false;

        });

    });

  }


  signOut() {
    return this.afAuth.auth.signOut()
  }


  getLoggedInUserName() {
    console.log('current email is: ' + this.afAuth.auth.currentUser.email);
    if (this.afAuth.auth.currentUser) {

      return this.userDBService.getCurrentUser(this.afAuth.auth.currentUser.email);

    }
    else {

      return null;

    }

  }


  getAuthToken() {

    return firebase.auth().currentUser.getIdToken();

  }



}
