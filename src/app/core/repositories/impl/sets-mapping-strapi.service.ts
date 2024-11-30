import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Set } from "../../models/set.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";

interface MediaRaw{
    data: StrapiMedia
}

export interface SetRaw {
    data: Data
    meta: Meta
  }
  
export interface Data {
    id: number
    attributes: SetAttributes
}
export interface SetData {
    data: SetAttributes;
}

export interface SetAttributes {
    name: string
    image:MediaRaw | number | null
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

export interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class SetsMappingStrapi implements IBaseMapping<Set> {
    

    setAdd(data: Set):SetData {
        return {
            data:{
                name:data.name,
                image:data.picture?Number(data.picture):null
            }
        };
    }
    setUpdate(data: Set):SetData {

        const mappedData: Partial<SetAttributes> = {};
 
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'picture': mappedData.image = data[key] ? Number(data[key]) : null;
                break;
                default:
            }
        });
        return {
            data: mappedData as SetAttributes
        };
    }
    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Set> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Set>((d:Data)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | SetRaw): Set {
        console.log('Datos recibidos en getOne:', data);
        const isSetRaw = (data: Data | SetRaw): data is SetRaw => 'meta' in data;
        
        const attributes = isSetRaw(data) ? data.data.attributes : data.attributes;
        const id = isSetRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            name: attributes.name,
            picture: typeof attributes.image === 'object' ? {
                url: attributes.image?.data?.attributes?.url,
                large: attributes.image?.data?.attributes?.formats?.large?.url || attributes.image?.data?.attributes?.url,
                medium: attributes.image?.data?.attributes?.formats?.medium?.url || attributes.image?.data?.attributes?.url,
                small: attributes.image?.data?.attributes?.formats?.small?.url || attributes.image?.data?.attributes?.url,
                thumbnail: attributes.image?.data?.attributes?.formats?.thumbnail?.url || attributes.image?.data?.attributes?.url,
            } : undefined
        };
    }
    getAdded(data: SetRaw):Set {
        return this.getOne(data.data);
    }
    getUpdated(data: SetRaw):Set {
        return this.getOne(data.data);
    }
    getDeleted(data: SetRaw):Set {
        return this.getOne(data.data);
    }
  }
  