import { Observable } from "rxjs";
import { Pack } from "../../models/pack.model";
import { IBaseService } from "./base-service.interface";


export interface IPacksService extends IBaseService<Pack> {

    getBySetId(setId: string): Observable<Pack | null>;
    
}