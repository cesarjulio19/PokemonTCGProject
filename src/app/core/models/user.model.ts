import { Model } from "./base.model";

export interface UserStrapi extends Model{
    username: string,
    email: string,
    picture?:{
        url:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
    admin:boolean

}