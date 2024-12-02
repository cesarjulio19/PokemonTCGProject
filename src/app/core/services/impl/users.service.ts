import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { UserStrapi } from "../../models/user.model";
import { IUsersService } from "../interfaces/users-service.interface";
import { USERS_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IUsersRepository } from "../../repositories/intefaces/users-repository.interface";








@Injectable({
    providedIn: 'root'
  })
  export class UsersService extends BaseService<UserStrapi> implements IUsersService {
    constructor(
      @Inject(USERS_REPOSITORY_TOKEN) repository: IUsersRepository
    ) {
      super(repository);
    }
  
    // Implementa métodos específicos si los hay
  }