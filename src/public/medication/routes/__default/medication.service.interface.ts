import { ICreateOneService } from "../../../../shared/interfaces/service/create-one.service.interface";
import { IFetchBulkService } from "../../../../shared/interfaces/service/fetch-bulk.service.interface";
import { IFetchOneService } from "../../../../shared/interfaces/service/fetch-one.service.interface";
import { IUpdateOneService } from "../../../../shared/interfaces/service/update-one.service.interface";

export interface IMedicationService<T> extends IFetchBulkService<T>, IFetchOneService<T>, ICreateOneService<void>, IUpdateOneService<void> { }