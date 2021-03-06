import { AbstractService } from "../../abstracts/service.abstract";

export interface IDeleteOneService<T> extends AbstractService<T> {
    deleteOne<K>(httpParams: K): Promise<T>
}