import { IFetchBulkService } from "../../../../shared/interfaces/service/fetch-bulk.service.interface";
import { IFetchOneService } from "../../../../shared/interfaces/service/fetch-one.service.interface";

export interface IUserService<T> extends IFetchBulkService<T>, IFetchOneService<T> { }