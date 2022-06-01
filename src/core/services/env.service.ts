import { EnvCollection } from "../../shared/constants/collections/env.collection";
import "dotenv/config";
import { EngineCollection } from "../../shared/constants/collections/engine.collection";

export class EnvService {
    private static _instance: EnvService | null = null;

    private constructor() { }

    public static get instance(): EnvService {
        if (this._instance === null) {
            this._instance = new EnvService();
        }

        return this._instance;
    }

    public get serverPort(): number {
        return Number(process.env[EnvCollection.SERVER_PORT] ?? 3000);
    }

    public get jwtAccessTokenSecret(): string {
        return process.env[EnvCollection.JWT_ACCESS_TOKEN_SECRET] ?? "";
    }

    public get jwtRefreshTokenSecret(): string {
        return process.env[EnvCollection.JWT_REFRESH_TOKEN_SECRET] ?? "";
    }

    public get dbType(): EngineCollection {
        return (process.env[EnvCollection.DB_TYPE] ?? "") as EngineCollection;
    }

    public get dbHost(): string {
        return process.env[EnvCollection.DB_HOST] ?? "";
    }

    public get dbPort(): number {
        return Number(process.env[EnvCollection.DB_PORT] ?? 5433);
    }

    public get dbUsername(): string {
        return process.env[EnvCollection.DB_USERNAME] ?? "";
    }

    public get dbPassword(): string {
        return process.env[EnvCollection.DB_PASSWORD] ?? "";
    }

    public get dbName(): string {
        return process.env[EnvCollection.DB_NAME] ?? "";
    }
}