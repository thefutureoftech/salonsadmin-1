import { Injectable } from '@angular/core';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    private owner: any;

    private ownerStaff: boolean;

    staff: Partial<User>[] = [
        {
            name: 'Mariam Khouni',
            arabicName: 'مريم',
            email: 'salah@salah.com',
            phoneNumber: '99999999',
            password: '666666',
        },
        {
            name: 'Laila Alawai',
            arabicName: 'ليلى',
            email: 'laila@mail.com',
            phoneNumber: '99999999',
            password: '666666',
        }
    ];


    constructor() {


    }


    setOwner(user: Partial<User>) {

        if (!user) {

            this.owner = new User(true);
        }
        else {

            this.owner = { ...user };

        }


    }

    getOwner() {

        return { ...this.owner };
    }

    setOwnerAsSatff(value: boolean) {

        this.ownerStaff = value;

    }

    isOwnerStaff() {

        return this.ownerStaff;

    }

    setStaff(staff: Partial<User>[]) {

        this.staff = staff;

    }

    getStaff() {

        return this.staff.slice();
    }

    getSelectedStaff(index: number) {

        return this.staff[index];

    }

    setSelectedStaff(staff: Partial<User>, index: number) {

        this.staff[index] = { ...staff };

    }

    addStaff(user: Partial<User>) {

        this.staff.unshift(user);

        return this.staff.length - 1;

    }



}
