// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { CARDS_REPOSITORY_TOKEN, SETS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { Set } from '../../models/set.model';
import { ICardsService } from '../interfaces/cards-service.interface';
import { ICardsRepository } from '../../repositories/intefaces/cards-repository.interface';
import { ISetsService } from '../interfaces/sets-service.interface';
import { ISetsRepository } from '../../repositories/intefaces/sets-repository.interface';
import { Observable } from 'rxjs';
import { Paginated } from '../../models/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class SetsService extends BaseService<Set> implements ISetsService {
  constructor(
    @Inject(SETS_REPOSITORY_TOKEN) repository: ISetsRepository
  ) {
    super(repository);
  }

  getSetsByName(name: string, page: number, pageSize: number): Observable<Paginated<Set>> {
    const filters = { 'name': name }; 
    return this.repository.getAll(page, pageSize, filters) as Observable<Paginated<Set>>;
  }
}