import { ICreateOneService } from "../../../../shared/interfaces/service/create-one.service.interface";
import { IFetchOneService } from "../../../../shared/interfaces/service/fetch-one.service.interface";
import { IUpdateOneService } from "../../../../shared/interfaces/service/update-one.service.interface";

export interface IAuthenticationService<T> extends IFetchOneService<T>, ICreateOneService<void>, IUpdateOneService<void> { }