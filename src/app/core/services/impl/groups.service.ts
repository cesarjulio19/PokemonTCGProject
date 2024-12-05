// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { GROUPS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { Group } from '../../models/group.model';
import { IBaseRepository } from '../../repositories/intefaces/base-repository.interface';


@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService<Group> {
  constructor(
    @Inject(GROUPS_REPOSITORY_TOKEN) repository: IBaseRepository<Group>
  ) {
    super(repository);
  }

}
