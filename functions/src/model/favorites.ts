export interface Favorite {

    id: string;

    userId: string;

    products: Partial<CartProduct>[];

}


export interface CartProduct {

    branchId: string;

    branchName: string;

    branchArabicName: string;

    branch_townName: string;

    branch_townArabicName: string;

    type: string;

    productId: string;

    productname: string;

    productArabicName: string;

    productPrice: number;

    productPriceCurrency: string;

    prodcutImageURL: string;

    loaded: boolean;    //For UI image loading only

}
