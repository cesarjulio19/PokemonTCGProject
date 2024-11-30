import { Model } from "./base.model";

export interface Set extends Model{
    name:string,
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
}