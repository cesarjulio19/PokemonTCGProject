import { Model } from "./base.model";



// Interfaz para la carta
export interface Card extends Model {
  name: string;
  number: number;
  illustration?: string;
  picture?:{
    url:string | undefined,
    large:string | undefined,
    medium:string | undefined,
    small:string | undefined,
    thumbnail:string | undefined
  },
  type: string; 
  rarity: string; 
  superType:string;
  setId?: string; 
}