import { Model } from "./base.model";

// Enumeración para los valores posibles de rarity
export type Rarity =
  | "ACE SPEC Rare"
  | "Amazing Rare"
  | "Classic Collection"
  | "Common"
  | "Double Rare"
  | "Hyper Rare"
  | "Illustration Rare"
  | "LEGEND"
  | "Promo"
  | "Radiant Rare"
  | "Rare"
  | "Rare ACE"
  | "Rare BREAK"
  | "Rare Holo"
  | "Rare Holo EX"
  | "Rare Holo GX"
  | "Rare Holo LV.X"
  | "Rare Holo Star"
  | "Rare Holo V"
  | "Rare Holo VMAX"
  | "Rare Holo VSTAR"
  | "Rare Prime"
  | "Rare Prism Star"
  | "Rare Rainbow"
  | "Rare Secret"
  | "Rare Shining"
  | "Rare Shiny"
  | "Rare Shiny GX"
  | "Rare Ultra"
  | "Shiny Rare"
  | "Shiny Ultra Rare"
  | "Special Illustration Rare"
  | "Trainer Gallery Rare Holo"
  | "Ultra Rare"
  | "Uncommon";

// Enumeración para los valores posibles de type
export type Type =
  | "Colorless"
  | "Darkness"
  | "Dragon"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Grass"
  | "Lightning"
  | "Metal"
  | "Psychic"
  | "Water";

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