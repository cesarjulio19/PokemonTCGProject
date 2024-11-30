import { Injectable } from "@angular/core";
import { StrapiMedia } from "../../services/impl/strapi-media.service"
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { MyCard } from "../../models/mycard.model";
import { Paginated } from "../../models/paginated.model";




interface Meta {}

interface MediaRaw{
    data: StrapiMedia
}

interface MyCardRaw {
    data: Data
    meta: Meta
}
  
interface Data {
    id: number
    attributes: MyCardAttributes
}
interface MyCardData {
    data: MyCardAttributes;
}

interface MyCardAttributes {
    quantity: number
    card: CardRaw | number | null
    user: UserRaw | number | null
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
   
}

interface UserRaw{
    data: UserData
}

interface UserData{
    id: number
    attributes: UserAttributes
}

interface UserAttributes {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    image:MediaRaw | number | null
    adminRole:boolean
    createdAt: string
    updatedAt: string
}

interface CardRaw{
    data: CardData
}

interface CardData{
    id: number
    attributes: CardAttributes
}

interface CardAttributes {
    name: string
    number: number
    illustration: string
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

@Injectable({
    providedIn: 'root'
  })

  export class MyCardsMappingStrapi implements IBaseMapping<MyCard>{

    setAdd(data: MyCard):MyCardData {
        return {
            data:{
                quantity:data.quantity,
                card:data.cardId?Number(data.cardId):null,
                user:data.userId?Number(data.userId):null,

            }
        };
    }


    setUpdate(data: Partial<MyCard>): MyCardData {
        const mappedData: Partial<MyCardAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'quantity': mappedData.quantity = data[key];
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
                case 'cardId': mappedData.card = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as MyCardAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<MyCard> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<MyCard>((d:Data|MyCardRaw)=>{
            return this.getOne(d);
        })};
    }

    getOne(data: Data | MyCardRaw): MyCard {
        const isMyCardRaw = (data: Data | MyCardRaw): data is MyCardRaw => 'meta' in data;

        const attributes = isMyCardRaw(data) ? data.data.attributes : data.attributes;
        const id = isMyCardRaw(data) ? data.data.id : data.id;
        
        return {
            id: id.toString(),
            quantity: attributes.quantity,
            cardId: typeof attributes.card === 'object' ? attributes.card?.data?.id.toString() : undefined,
            userId: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
        };
    }

    getAdded(data: MyCardRaw):MyCard {
        return this.getOne(data.data);
    }
    getUpdated(data: MyCardRaw):MyCard {
        return this.getOne(data.data);
    }
    getDeleted(data: MyCardRaw):MyCard {
        return this.getOne(data.data);
    }



  }

