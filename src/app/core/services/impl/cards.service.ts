// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { CARDS_REPOSITORY_TOKEN, GROUPS_REPOSITORY_TOKEN, PEOPLE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { Card } from '../../models/card.model';
import { ICardsService } from '../interfaces/cards-service.interface';
import { ICardsRepository } from '../../repositories/intefaces/cards-repository.interface';
import { Observable } from 'rxjs';
import { Paginated } from '../../models/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService extends BaseService<Card> implements ICardsService {
  constructor(
    @Inject(CARDS_REPOSITORY_TOKEN) repository: ICardsRepository
  ) {
    super(repository);
  }

  getCardsBySetPaginated(setId: string, page: number, pageSize: number): Observable<Paginated<Card>> {
    const filters = { 'set.id': setId }; 
    return this.repository.getAll(page, pageSize, filters) as Observable<Paginated<Card>>;
  }

  getCardsBySet(setId: string): Observable<Card[]> {
    const filters = { 'set.id': setId }; 
    return this.repository.getAll(-1, 25,filters) as Observable<Card[]>;
  }

  // Implementa métodos específicos si los hay
}