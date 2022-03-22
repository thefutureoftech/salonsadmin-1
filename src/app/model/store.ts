export class Store {

    id: string;
    name: string;
    arabicName: string;
    ownerId: string;
    logo: string;
    logoURL: string;
    busTypeId: string;
    status: string;
    countryId: string;
    createdAt: Date


    constructor() {

        this.createdAt = new Date();

    }

}
