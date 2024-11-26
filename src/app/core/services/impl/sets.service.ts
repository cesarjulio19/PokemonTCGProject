// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { CARDS_REPOSITORY_TOKEN, GROUPS_REPOSITORY_TOKEN, PEOPLE_REPOSITORY_TOKEN, SETS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IGroupsService } from '../interfaces/groups-service.interface';
import { Group } from '../../models/group.model';
import { IGroupsRepository } from '../../repositories/intefaces/groups-repository.interface';
import { Set } from '../../models/set.model';
import { ICardsService } from '../interfaces/cards-service.interface';
import { ICardsRepository } from '../../repositories/intefaces/cards-repository.interface';
import { ISetsService } from '../interfaces/sets-service.interface';
import { ISetsRepository } from '../../repositories/intefaces/sets-repository.interface';

@Injectable({
  providedIn: 'root'
})
export class SetsService extends BaseService<Set> implements ISetsService {
  constructor(
    @Inject(SETS_REPOSITORY_TOKEN) repository: ISetsRepository
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}