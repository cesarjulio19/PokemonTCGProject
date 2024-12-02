import { UserStrapi } from "../../models/user.model";
import { IBaseRepository } from "./base-repository.interface";



export interface IUsersRepository extends IBaseRepository<UserStrapi>{

}