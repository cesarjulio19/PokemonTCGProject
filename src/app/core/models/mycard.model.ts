import { Model } from "./base.model";


export interface MyCard extends Model {
    quantity: number;
    cardId?: string;
    userId?: string; 
}