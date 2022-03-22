export interface StoreMessage{


    id: string;

    type: string;

    branch_id: string;

    sender_email: string;

    sender_phone: string;

    recepient_email: string;

    recepient_phone: string;

    sent_on: Date;

    header: string;

    content: string;

    new_flag: boolean;

}