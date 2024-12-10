import { Observable } from 'rxjs';
import { Set } from '../../models/set.model';
import { IBaseService } from './base-service.interface';
import { Paginated } from '../../models/paginated.model';

export interface ISetsService extends IBaseService<Set> {
  getSetsByName(name: string, page: number, pageSize: number): Observable<Paginated<Set>>;
}