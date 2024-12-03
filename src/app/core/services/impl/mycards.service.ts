import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { MyCard } from "../../models/mycard.model";
import { IMyCardsService } from "../interfaces/mycards-service.interface";
import { MYCARDS_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IMyCardsRepository } from "../../repositories/intefaces/mycards-repository.interface";
import { map, Observable } from "rxjs";
import { Paginated } from "../../models/paginated.model";



@Injectable({
    providedIn: 'root'
  })
  export class MyCardsService extends BaseService<MyCard> implements IMyCardsService {
    constructor(
      @Inject(MYCARDS_REPOSITORY_TOKEN) repository: IMyCardsRepository
    ) {
      super(repository);
    }


    getMyCardsByUser(userId: string, page: number, pageSize: number): Observable<Paginated<MyCard>> {
      const filters = { 'user.id': userId }; 
      return this.repository.getAll(page, pageSize, filters) as Observable<Paginated<MyCard>>;
    }

    getByCardId(cardId: string, userId: string): Observable<MyCard | null> {
      return this.repository.getAll(1, 1, {'card.id': cardId, 'user.id': userId}).pipe(
        map(res => Array.isArray(res) ? res[0] || null : res.data[0] || null)
      );
    }
  
    // Implementa métodos específicos si los hay
  }