import * as Express from "express";
import { PGDatabase } from "./core/database/engines/pg.database";
import { EnvService } from "./core/services/env.service";
import { PublicGateway } from "./public/public.gateway";

export class Main {
    private readonly _application: Express.Application;
    private readonly _serverPort: number;

    public constructor() {
        /** Properties */
        this._application = Express();
        this._serverPort = EnvService.instance.serverPort;

        /** Methods */

        this._initializeConfigurations();
        this._initializeDatabase();
        this._initializeRoutes();
        this._initializeServer();
        this._destroyServer();
    }

    private _initializeConfigurations(): void {
        this._application.use(Express.json());
    };

    private async _initializeDatabase(): Promise<void> {
        await PGDatabase.instance.createConnection().catch((error) => {
            return new Error(error);
        });
    }

    private _initializeRoutes(): void {
        this._application.all("*", new PublicGateway().subscribe());
    };

    private _initializeServer(): void {
        this._application.listen((this._serverPort), () => console.log(`Server initialized on Port:${this._serverPort}!`));
    };

    private _destroyServer(): void {
        this._application.on("close", async () => {
            await PGDatabase.instance.closeConnection().catch((error) => {
                return new Error(error);
            });
        })
    }

}

new Main();