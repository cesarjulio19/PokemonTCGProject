import { UserStrapi } from "../../models/user.model";
import { IBaseService } from "./base-service.interface";




export interface IUsersService extends IBaseService<UserStrapi> {
    
}