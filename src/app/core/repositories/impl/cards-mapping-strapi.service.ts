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
    illustration?: string
    set: SetRaw | number | null
    type:string
    rarity:string
    superType:string
    image:MediaRaw | number | null
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
    image:MediaRaw | number | null
    createdAt: string
    updatedAt: string
    publishedAt: string
}

interface SetAttributes {
    name: string
    image:MediaRaw | number | null
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
                set:data.setId?Number(data.setId):null,
                type:data.type,
                rarity:data.rarity,
                superType:data.superType,
                image:data.picture?Number(data.picture):null
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
                case 'type': mappedData.type = data[key];
                break;
                case 'rarity': mappedData.rarity = data[key];
                break;
                case 'picture': mappedData.image = data[key] ? Number(data[key]) : null;
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
            illustration: attributes.illustration,
            rarity: attributes.rarity,
            type: attributes.type,
            superType: attributes.superType,
            picture: typeof attributes.image === 'object' ? {
                url: attributes.image?.data?.attributes?.url,
                large: attributes.image?.data?.attributes?.formats?.large?.url || attributes.image?.data?.attributes?.url,
                medium: attributes.image?.data?.attributes?.formats?.medium?.url || attributes.image?.data?.attributes?.url,
                small: attributes.image?.data?.attributes?.formats?.small?.url || attributes.image?.data?.attributes?.url,
                thumbnail: attributes.image?.data?.attributes?.formats?.thumbnail?.url || attributes.image?.data?.attributes?.url,
            } : undefined,
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
  