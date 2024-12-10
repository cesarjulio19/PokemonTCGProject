// src/app/repositories/repository.factory.ts
import { FactoryProvider, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { AUTH_MAPPING_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, CARDS_API_URL_TOKEN, CARDS_REPOSITORY_MAPPING_TOKEN, CARDS_REPOSITORY_TOKEN, CARDS_RESOURCE_NAME_TOKEN, MYCARDS_API_URL_TOKEN, MYCARDS_REPOSITORY_MAPPING_TOKEN, MYCARDS_REPOSITORY_TOKEN, MYCARDS_RESOURCE_NAME_TOKEN, PACKS_API_URL_TOKEN, PACKS_REPOSITORY_MAPPING_TOKEN, PACKS_REPOSITORY_TOKEN, PACKS_RESOURCE_NAME_TOKEN, SETS_API_URL_TOKEN, SETS_REPOSITORY_MAPPING_TOKEN, SETS_REPOSITORY_TOKEN, SETS_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN, USERS_API_URL_TOKEN, USERS_REPOSITORY_MAPPING_TOKEN, USERS_REPOSITORY_TOKEN, USERS_RESOURCE_NAME_TOKEN } from './repository.tokens';
import { BaseRespositoryLocalStorageService } from './impl/base-repository-local-storage.service';
import { Model } from '../models/base.model';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { JsonServerRepositoryService } from './impl/json-server-repository.service';
import { StrapiRepositoryService } from './impl/strapi-repository.service';
import { BaseAuthenticationService } from '../services/impl/base-authentication.service';
import { IAuthMapping } from '../services/interfaces/auth-mapping.interface';
import { StrapiAuthenticationService } from '../services/impl/strapi-authentication.service';
import { StrapiAuthMappingService } from '../services/impl/strapi-auth-mapping.service';
import { IStrapiAuthentication } from '../services/interfaces/strapi-authentication.interface';
import { StrapiMediaService } from '../services/impl/strapi-media.service';
import { BaseMediaService } from '../services/impl/base-media.service';
import { Card } from '../models/card.model';
import { Set } from '../models/set.model';
import { CardsMappingStrapi } from './impl/cards-mapping-strapi.service';
import { SetsMappingStrapi } from './impl/sets-mapping-strapi.service';
import { MyCard } from '../models/mycard.model';
import { MyCardsMappingStrapi } from './impl/mycards-mapping-strapi.service';
import { PacksMappingStrapi } from './impl/packs-mapping-strapi.service';
import { Pack } from '../models/pack.model';
import { UserStrapi } from '../models/user.model';
import { UsersMappingStrapi } from './impl/users-mapping-strapi.service';
import { UsersService } from '../services/impl/users.service';
export function createBaseRepositoryFactory<T extends Model>(
  token: InjectionToken<IBaseRepository<T>>,
  dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, http: HttpClient, auth:IStrapiAuthentication, apiURL: string, resource: string, mapping: IBaseMapping<T>) => {
      switch (backend) {
        case 'http':
          return new BaseRepositoryHttpService<T>(http, auth, apiURL, resource, mapping);
        case 'local-storage':
          return new BaseRespositoryLocalStorageService<T>(resource, mapping);
        case 'json-server':
          return new JsonServerRepositoryService<T>(http, auth,apiURL, resource, mapping);
        case 'strapi':
          return new StrapiRepositoryService<T>(http, auth, apiURL, resource, mapping);
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

type ModelType = 'card' | 'set' | 'mycard' | 'pack' | 'user';

const modelTypeMapping: Record<ModelType, new () => IBaseMapping<any>> = {
  card: CardsMappingStrapi,
  set: SetsMappingStrapi,
  mycard: MyCardsMappingStrapi,
  pack: PacksMappingStrapi,
  user: UsersMappingStrapi,
};

export function createBaseMappingFactory<T extends Model>(
  token: InjectionToken<IBaseMapping<T>>,
  dependencies: any[],
  modelType: ModelType
): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'strapi': {
          const MappingClass = modelTypeMapping[modelType];
          if (!MappingClass) {
            throw new Error(`Mapping for modelType "${modelType}" not found.`);
          }
          return new MappingClass();
        }
        default:
          throw new Error('BACKEND NOT IMPLEMENTED');
      }
    },
    deps: dependencies,
  };
}

export function createBaseAuthMappingFactory(token: InjectionToken<IAuthMapping>, dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'strapi':
          return new StrapiAuthMappingService();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};



export const CardsMappingFactory = createBaseMappingFactory<Card>(
  CARDS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'card'
);

export const MyCardsMappingFactory = createBaseMappingFactory<MyCard>(
  MYCARDS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'mycard'
);

export const PacksMappingFactory = createBaseMappingFactory<Pack>(
  PACKS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'pack'
);

export const SetsMappingFactory = createBaseMappingFactory<Set>(
  SETS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'set'
);

export const UsersMappingFactory = createBaseMappingFactory<UserStrapi>(
  USERS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'user'
);

export const AuthMappingFactory: FactoryProvider = createBaseAuthMappingFactory(AUTH_MAPPING_TOKEN, [BACKEND_TOKEN]);

export const AuthenticationServiceFactory:FactoryProvider = {
  provide: BaseAuthenticationService,
  useFactory: (backend:string, signIn:string, signUp:string, meUrl:string, mapping:IAuthMapping, http:HttpClient ) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAuthenticationService(signIn, signUp, meUrl, mapping, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_MAPPING_TOKEN, HttpClient]
};

export const MediaServiceFactory:FactoryProvider = {
  provide: BaseMediaService,
  useFactory: (backend:string, upload:string, auth:IStrapiAuthentication, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiMediaService(upload, auth, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, UPLOAD_API_URL_TOKEN, BaseAuthenticationService, HttpClient]
};

export const CardsRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Card>(CARDS_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, CARDS_API_URL_TOKEN, CARDS_RESOURCE_NAME_TOKEN, CARDS_REPOSITORY_MAPPING_TOKEN]
);
export const SetsRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Set>(SETS_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, SETS_API_URL_TOKEN, SETS_RESOURCE_NAME_TOKEN, SETS_REPOSITORY_MAPPING_TOKEN]
);
export const MyCardsRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<MyCard>(MYCARDS_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, MYCARDS_API_URL_TOKEN, MYCARDS_RESOURCE_NAME_TOKEN, MYCARDS_REPOSITORY_MAPPING_TOKEN]
);
export const PacksRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Pack>(PACKS_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, PACKS_API_URL_TOKEN, PACKS_RESOURCE_NAME_TOKEN, PACKS_REPOSITORY_MAPPING_TOKEN]
);
export const UsersRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<UserStrapi>(USERS_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, USERS_API_URL_TOKEN, USERS_RESOURCE_NAME_TOKEN, USERS_REPOSITORY_MAPPING_TOKEN]
);
