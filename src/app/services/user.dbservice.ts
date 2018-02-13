import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { OnInit, Injectable } from '@angular/core';

import { Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';


@Injectable()
export class UserDBService implements OnInit {


    constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private http: HttpClient) {

    }

    ngOnInit() {

    }


    createUser(user: User) {

        user.createdBy = 'Super Admin';

        const collection = this.afs.collection('users');
console.log(user.email);
        let data = {
            email: user.email,
            name: user.name,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            password: user.password,
            uid: 'dummy',
            createdBy: 'Super Admin',
            createdAt: new Date().getTime()

        };

        return collection.add(data);

        // const path = 'https://us-central1-requestordev.cloudfunctions.net/createOwner';


        // let params: HttpParams = new HttpParams().set('email', user.email);
        // params.set('name', user.name);
        // params.set('password', user.password);
        // params.set('phone', user.phoneNumber);

        // this.http.get(path, { params: params }).subscribe(

        //     response => {

        //         console.log(response);
        //     },

        //     error => {

        //         console.log(error);
        //     }
        // );



    }


}