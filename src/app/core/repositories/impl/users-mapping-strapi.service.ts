import { Injectable } from "@angular/core";
import { StrapiMedia } from "../../services/impl/strapi-media.service";
import { UserStrapi } from "../../models/user.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";




interface Meta {}

interface MediaRaw{
    data: StrapiMedia
}

interface UserRaw{
    id: number,
    username:string,
    email:string,
    image:any
    adminRole:boolean
}





@Injectable({
    providedIn: 'root'
  })

  export class UsersMappingStrapi implements IBaseMapping<UserStrapi>{

    getUpdated(data: UserRaw): UserStrapi {
        return this.getOne(data);
    }

    getPaginated(page: number, pageSize: number, pages: number, data: any): Paginated<UserStrapi> {
        throw new Error("Method not implemented.");
    }
    getOne(data: UserRaw): UserStrapi {
        return {
          id: data.id.toString(),
          username: data.username,
          email: data.email,
          admin: data.adminRole,
          picture: typeof data.image === 'object' ? {
            url: data.image?.url,
            small: data.image?.formats?.small?.url || data.image?.url,
            thumbnail: data.image?.formats?.small?.url || data.image?.url,
        } : undefined,
        };
      }
    getAdded(data: any): UserStrapi {
        throw new Error("Method not implemented.");
    }
    getDeleted(data: any): UserStrapi {
        throw new Error("Method not implemented.");
    }
    setAdd(data: UserStrapi) {
        throw new Error("Method not implemented.");
    }

    setUpdate(data: Partial<UserStrapi>): UserRaw {
        const mappedData: Partial<UserRaw> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'id': mappedData.username = data[key];
                break;
                case 'username': mappedData.username = data[key];
                break;
                case 'email': mappedData.email = data[key];
                break;
                case 'admin': mappedData.adminRole = data[key];
                break;
                case 'picture': mappedData.image = data[key] ? Number(data[key]) : null;
                break;
                
            }
        });

        return mappedData as UserRaw
    }



  }