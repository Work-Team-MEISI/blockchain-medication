import { Repository } from "typeorm";
import { AbstractDatabase } from "../../../../../shared/abstracts/database.abstract";
import { UserEntity } from "../../../structs/user.entity";
import { IUserService } from "../user.service.interface";

export class UserService<T> implements IUserService<T> {
    private readonly _repository: Repository<UserEntity>;

    public constructor(
        private readonly _database: AbstractDatabase,
    ) {
        this._repository = this._database.dataSource!.getRepository(UserEntity);
    }

    public async fetchBulk(): Promise<T[]> {
        return await this._repository.find().catch((error) => error);
    }

    public async fetchOne<K>(httpParams: K): Promise<T> {
        return await this._repository.findOneBy(httpParams).catch((error) => error);
    }
}