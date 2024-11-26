import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Set } from "../../models/set.model";

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
                name:data.name
            }
        };
    }
    setUpdate(data: Set):SetData {
        let toReturn:SetData = {
            data:{
                name:""
            }
        };  
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': toReturn.data['name']=data[key];
                break;
                default:
            }
        });
        return toReturn;
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
            name: attributes.name
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
  