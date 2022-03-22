import { Order } from './booking';

export interface UserOrders {

    user: string;

    orders: Partial<Order>[];

}