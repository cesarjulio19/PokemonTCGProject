import { Injectable } from "@angular/core";
import { Paginated } from "../../models/paginated.model";
import { IAuthMapping } from "../interfaces/auth-mapping.interface";
import { SignInPayload, SignUpPayload, User } from "../../models/auth.model";
import { StrapiMedia } from "./strapi-media.service";


interface MediaRaw{
    data: StrapiMedia
}

export interface StrapiMeResponse {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    image:MediaRaw | number | null
    adminRole:boolean
}

export interface StrapiSignInResponse {
    jwt: string
    user: StrapiUser
  }

export interface StrapiSignUpResponse {
    jwt: string
    user: StrapiUser
  }
  
  export interface StrapiUser {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    image:MediaRaw | number | null
    adminRole:boolean
  }
  

interface StrapiSignIn{
    identifier:string,
    password:string
}

interface StrapiSignUp{
    email:string,
    password:string,
    username:string
}
export interface GroupRaw {
    id: string
    nombre: string
}
@Injectable({
    providedIn: 'root'
  })
  export class StrapiAuthMappingService implements IAuthMapping {
    signInPayload(payload: SignInPayload):StrapiSignIn{
        return {
            identifier:payload.email,
            password:payload.password
        };
    }
    signUpPayload(payload: SignUpPayload):StrapiSignUp {
        return {
            email:payload.email,
            password:payload.password,
            username:payload.name + " "+ payload.surname

        };
    }
    signIn(response: StrapiSignInResponse): User {
        
        return {
            id:response.user.id.toString(),
            username:response.user.username,
            email:response.user.email,
            //picture:response.user.image
            admin:response.user.adminRole
        };
    }
    signUp(response: StrapiSignUpResponse): User {
        return {
            id:response.user.id.toString(),
            username:response.user.username,
            email:response.user.email,
            admin:response.user.adminRole
        };
    }

    me(response: StrapiMeResponse): User {
        return {
            id:response.id.toString(),
            username:response.username,
            email:response.email,
            admin:response.adminRole

        };
    }

    
    
  }
  