import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Person } from "../../models/person.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";
import { Card } from "../../models/card.model";


interface MediaRaw{
    data: StrapiMedia
}

interface CardRaw {
    data: Data
    meta: Meta
}
  
interface Data {
    id: number
    attributes: CardAttributes
}
interface CardData {
    data: CardAttributes;
}

interface CardAttributes {
    name: string
    number: number
    image: string
    set: SetRaw | number | null
    type:string
    rarity:string
    superType:string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
   
}

interface SetRaw{
    data: SetData,
    meta: Meta
}

interface SetData {
    id: number
    attributes: SetAttributes
}
  
interface SetAttributes {
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

interface SetAttributes {
    name: string
}



interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class CardsMappingStrapi implements IBaseMapping<Card> {

    


    setAdd(data: Card):CardData {
        return {
            data:{
                name:data.name,
                number:data.number,
                image:data.picture,
                set:data.setId?Number(data.setId):null,
                type:data.type,
                rarity:data.rarity,
                superType:data.superType

            }
        };
    }
    setUpdate(data: Partial<Card>): CardData {
        const mappedData: Partial<CardAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'number': mappedData.number = data[key];
                break;
                case 'picture': mappedData.image = data[key];
                break;
                case 'type': mappedData.type = data[key];
                break;
                case 'rarity': mappedData.rarity = data[key];
                break;
                case 'setId': mappedData.set = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as CardAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Card> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Card>((d:Data|CardRaw)=>{
            return this.getOne(d);
        })};
    }
    
    getOne(data: Data | CardRaw): Card {
        const isCardRaw = (data: Data | CardRaw): data is CardRaw => 'meta' in data;

        const attributes = isCardRaw(data) ? data.data.attributes : data.attributes;
        const id = isCardRaw(data) ? data.data.id : data.id;
        
        return {
            id: id.toString(),
            name: attributes.name,
            number: attributes.number,
            picture: attributes.image,
            rarity: attributes.rarity,
            type: attributes.type,
            superType: attributes.superType,
            setId: typeof attributes.set === 'object' ? attributes.set?.data?.id.toString() : undefined,

        };
    }
    getAdded(data: CardRaw):Card {
        return this.getOne(data.data);
    }
    getUpdated(data: CardRaw):Card {
        return this.getOne(data.data);
    }
    getDeleted(data: CardRaw):Card {
        return this.getOne(data.data);
    }
  }
  