import { DataSource } from "typeorm";

export abstract class AbstractDatabase {
    protected _dataSource: DataSource | null;

    protected constructor() {
        this._dataSource = null;
    }

    public get dataSource(): DataSource | null {
        return this._dataSource;
    }

    public abstract createConnection(): void;

    public abstract closeConnection(): Promise<void>;
}