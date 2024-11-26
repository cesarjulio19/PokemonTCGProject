import { Observable } from 'rxjs';
import { Card } from '../../models/card.model';
import { IBaseService } from './base-service.interface';
import { Paginated } from '../../models/paginated.model';

export interface ICardsService extends IBaseService<Card> {
  
  getCardsBySet(setId: string, page: number, pageSize: number): Observable<Paginated<Card>>;
}