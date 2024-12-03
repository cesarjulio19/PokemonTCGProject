import { Observable } from "rxjs";
import { MyCard } from "../../models/mycard.model";
import { IBaseService } from "./base-service.interface";
import { Paginated } from "../../models/paginated.model";


export interface IMyCardsService extends IBaseService<MyCard> {
    getMyCardsByUser(setId: string, page: number, pageSize: number): Observable<Paginated<MyCard>>;
    getByCardId(cardId: string, userId: string): Observable<MyCard | null>;
}
  