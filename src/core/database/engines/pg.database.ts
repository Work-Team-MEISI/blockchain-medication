import { DataSource } from "typeorm";
import { AbstractDatabase } from "../../../shared/abstracts/database.abstract";
import { EnvService } from "../../services/env.service";

export class PGDatabase extends AbstractDatabase {
    private static _instance: PGDatabase | null = null;

    private constructor() {
        super();
    }

    public static get instance(): PGDatabase {
        if (this._instance === null) {
            this._instance = new PGDatabase();
        }

        return this._instance;
    }

    public async createConnection(): Promise<void> {
        this._dataSource = new DataSource({
            name: "default",
            type: EnvService.instance.dbType,
            host: EnvService.instance.dbHost,
            port: EnvService.instance.dbPort,
            username: EnvService.instance.dbUsername,
            password: EnvService.instance.dbPassword,
            database: EnvService.instance.dbName,
            entities: ["./src/public/**/structs/*.entity.ts"],
            logging: true,
            synchronize: true,
        });

        await this._dataSource.initialize().catch((error) => error);

        this._dataSource.synchronize();
    }

    public async closeConnection(): Promise<void> {
        return await this._dataSource!.destroy().catch((error) => error);
    }

}