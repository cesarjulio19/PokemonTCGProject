import { Model } from "./base.model";



// Interfaz para la carta
export interface Card extends Model {
  name: string;
  number: number;
  picture: string;
  type: string; 
  rarity: string; 
  superType:string;
  setId?: string; 
}