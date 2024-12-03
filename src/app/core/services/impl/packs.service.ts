import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { Pack } from "../../models/pack.model";
import { IPacksService } from "../interfaces/packs-service.interface";
import { PACKS_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IPacksRepository } from "../../repositories/intefaces/packs-repository.interfaces";
import { map, Observable } from "rxjs";











@Injectable({
    providedIn: 'root'
  })
  export class PacksService extends BaseService<Pack> implements IPacksService {
    constructor(
      @Inject(PACKS_REPOSITORY_TOKEN) repository: IPacksRepository
    ) {
      super(repository);
    }

    getBySetId(setId: string): Observable<Pack | null> {
      return this.repository.getAll(1, 1, {set: setId}).pipe(
        map(res => Array.isArray(res) ? res[0] || null : res.data[0] || null)
      );
    }
  
    // Implementa métodos específicos si los hay
  }