import { Injectable } from "@angular/core";
import { StrapiMedia } from "../../services/impl/strapi-media.service"
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Pack } from "../../models/pack.model";
import { Paginated } from "../../models/paginated.model";

interface Meta {}

interface MediaRaw{
    data: StrapiMedia
}

interface PackRaw {
    data: Data
    meta: Meta
}
  
interface Data {
    id: number
    attributes: PackAttributes
}
interface PackData {
    data: PackAttributes;
}

interface PackAttributes {
    name: string
    set: SetRaw | number | null
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


  export class PacksMappingStrapi implements IBaseMapping<Pack>{

    setAdd(data: Pack):PackData {
        return {
            data:{
                name:data.name,
                set:data.setId?Number(data.setId):null,

            }
        };
    }

    setUpdate(data: Partial<Pack>): PackData {
        const mappedData: Partial<PackAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'setId': mappedData.set = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as PackAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Pack> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Pack>((d:Data|PackRaw)=>{
            return this.getOne(d);
        })};
    }

    getOne(data: Data | PackRaw): Pack {
        const isPackRaw = (data: Data | PackRaw): data is PackRaw => 'meta' in data;

        const attributes = isPackRaw(data) ? data.data.attributes : data.attributes;
        const id = isPackRaw(data) ? data.data.id : data.id;
        
        return {
            id: id.toString(),
            name: attributes.name,
            setId: typeof attributes.set === 'object' ? attributes.set?.data?.id.toString() : undefined,
        };
    }

    getAdded(data: PackRaw):Pack {
        return this.getOne(data.data);
    }
    getUpdated(data: PackRaw):Pack {
        return this.getOne(data.data);
    }
    getDeleted(data: PackRaw):Pack {
        return this.getOne(data.data);
    }

    
  }