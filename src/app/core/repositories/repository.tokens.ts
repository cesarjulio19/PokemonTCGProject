// src/app/repositories/repository.tokens.ts
import { InjectionToken } from '@angular/core';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { ITasksRepository } from './intefaces/tasks-repository.interface';
import { IPeopleRepository } from './intefaces/people-repository.interface';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { Person } from '../models/person.model';
import { IStrapiAuthentication } from '../services/interfaces/strapi-authentication.interface';
import { IAuthentication } from '../services/interfaces/authentication.interface';
import { Group } from '../models/group.model';
import { Card } from '../models/card.model';
import { Set } from '../models/set.model';
import { IMyCardsRepository } from './intefaces/mycards-repository.interface';
import { IPacksRepository } from './intefaces/packs-repository.interfaces';
import { MyCard } from '../models/mycard.model';
import { Pack } from '../models/pack.model';
import { User } from '../models/auth.model';
import { UserStrapi } from '../models/user.model';
import { IUsersRepository } from './intefaces/users-repository.interface';

export const RESOURCE_NAME_TOKEN = new InjectionToken<string>('ResourceName');
export const PEOPLE_RESOURCE_NAME_TOKEN = new InjectionToken<string>('PeopleResourceName');
export const GROUPS_RESOURCE_NAME_TOKEN = new InjectionToken<string>('GroupsResourceName');
export const CARDS_RESOURCE_NAME_TOKEN = new InjectionToken<string>('CardsResourceName');
export const SETS_RESOURCE_NAME_TOKEN = new InjectionToken<string>('SetsResourceName');
export const MYCARDS_RESOURCE_NAME_TOKEN = new InjectionToken<string>('MyCardsResourceName');
export const PACKS_RESOURCE_NAME_TOKEN = new InjectionToken<string>('PacksResourceName');
export const USERS_RESOURCE_NAME_TOKEN = new InjectionToken<string>('UsersResourceName');

export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
export const PEOPLE_REPOSITORY_TOKEN = new InjectionToken<IPeopleRepository>('IPeopleRepository');
export const GROUPS_REPOSITORY_TOKEN = new InjectionToken<IPeopleRepository>('IGroupsRepository');
export const TASKS_REPOSITORY_TOKEN = new InjectionToken<ITasksRepository>('ITasksRepository');
export const CARDS_REPOSITORY_TOKEN = new InjectionToken<ITasksRepository>('ICardsRepository');
export const SETS_REPOSITORY_TOKEN = new InjectionToken<ITasksRepository>('ISetsRepository');
export const MYCARDS_REPOSITORY_TOKEN = new InjectionToken<IMyCardsRepository>('IMyCardsRepository');
export const PACKS_REPOSITORY_TOKEN = new InjectionToken<IPacksRepository>('IPacksRepository');
export const USERS_REPOSITORY_TOKEN = new InjectionToken<IUsersRepository>('IUsersRepository');


export const API_URL_TOKEN = new InjectionToken<string>('ApiUrl');
export const PEOPLE_API_URL_TOKEN = new InjectionToken<string>('PeopleApiUrl');
export const GROUPS_API_URL_TOKEN = new InjectionToken<string>('GroupsApiUrl');
export const TASKS_API_URL_TOKEN = new InjectionToken<string>('TasksApiUrl');
export const CARDS_API_URL_TOKEN = new InjectionToken<string>('CardsApiUrl');
export const SETS_API_URL_TOKEN = new InjectionToken<string>('SetsApiUrl');
export const MYCARDS_API_URL_TOKEN = new InjectionToken<string>('MyCardsApiUrl');
export const PACKS_API_URL_TOKEN = new InjectionToken<string>('PacksApiUrl');
export const USERS_API_URL_TOKEN = new InjectionToken<string>('UsersApiUrl');
export const AUTH_SIGN_IN_API_URL_TOKEN = new InjectionToken<string>('AuthSignInApiUrl');
export const AUTH_SIGN_UP_API_URL_TOKEN = new InjectionToken<string>('AuthSignUpApiUrl');
export const AUTH_ME_API_URL_TOKEN = new InjectionToken<string>('AuthMeApiUrl');
export const UPLOAD_API_URL_TOKEN = new InjectionToken<string>('UploadApiUrl');

export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IBaseRepositoryMapping');
export const PEOPLE_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Person>>('IPeopleRepositoryMapping');
export const GROUPS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Group>>('IGroupsRepositoryMapping');
export const CARDS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Card>>('ICardsRepositoryMapping');
export const SETS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Set>>('ISetsRepositoryMapping');
export const MYCARDS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<MyCard>>('IMyCardsRepositoryMapping');
export const PACKS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Pack>>('IPacksRepositoryMapping');
export const USERS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<UserStrapi>>('IUsersRepositoryMapping');
export const AUTH_TOKEN = new InjectionToken<IAuthentication>('IAuthentication');
export const STRAPI_AUTH_TOKEN = new InjectionToken<IStrapiAuthentication>('IStrapiAuthentication');
export const AUTH_MAPPING_TOKEN = new InjectionToken<IBaseMapping<User>>('IAuthMapping');
export const BACKEND_TOKEN = new InjectionToken<string>('Backend');