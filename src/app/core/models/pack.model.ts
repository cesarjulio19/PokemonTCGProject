import { Model } from "./base.model";


export interface Pack extends Model {
    name: string;
    numberCards: number;
    setId?: string;
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
}