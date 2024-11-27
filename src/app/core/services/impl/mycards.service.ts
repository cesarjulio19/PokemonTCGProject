import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { MyCard } from "../../models/mycard.model";
import { IMyCardsService } from "../interfaces/mycards-service.interface";
import { MYCARDS_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IMyCardsRepository } from "../../repositories/intefaces/mycards-repository.interface";



@Injectable({
    providedIn: 'root'
  })
  export class MyCardsService extends BaseService<MyCard> implements IMyCardsService {
    constructor(
      @Inject(MYCARDS_REPOSITORY_TOKEN) repository: IMyCardsRepository
    ) {
      super(repository);
    }
  
    // Implementa métodos específicos si los hay
  }