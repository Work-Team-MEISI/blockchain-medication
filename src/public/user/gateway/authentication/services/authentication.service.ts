import { Repository } from "typeorm";
import { AbstractDatabase } from "../../../../../shared/abstracts/database.abstract";
import { UserEntity } from "../../../structs/user.entity";
import { IAuthenticationService } from "../authentication.service.interface";

export class AuthenticationService<T> implements IAuthenticationService<T> {
    private readonly _repository: Repository<UserEntity>;

    public constructor(
        private readonly _database: AbstractDatabase,
    ) {
        this._repository = this._database.dataSource!.getRepository(UserEntity);
    }

    public async fetchOne<K>(httpParams: K): Promise<T> {
        return await this._repository.findOneBy(httpParams).catch((error) => error);
    }

    public async createOne<K>(httpBody: K): Promise<void> {
        return await this._repository.save(httpBody).catch((error) => error);
    }

    public async updateOne<K, V>(httpParams: K, httpBody: V): Promise<void> {
        return await this._repository.update(httpParams, httpBody).catch((error) => error);
    }

}