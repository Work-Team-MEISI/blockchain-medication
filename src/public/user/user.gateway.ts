import { Request, Response, Router } from "express";
import { PGDatabase } from "../../core/database/engines/pg.database";
import { IGateway } from "../../shared/interfaces/gateway.interface";
import { UserGatewayCollection } from "./constants/user.gateway.collection";
import { AuthenticationGateway } from "./gateway/authentication/authentication.gateway";
import { UserService } from "./gateway/__default/services/user.service";
import { UserController } from "./gateway/__default/user.controller";
import { UserEntity } from "./structs/user.entity";

export class UserGateway implements IGateway {
    private readonly _router: Router;

    public constructor() {
        this._router = Router();
    }

    public subscribe(): Router {
        /** __default */

        this._router.get("", async (_req: Request, _res: Response) => {
            const service = new UserService<UserEntity>(PGDatabase.instance);
            const controller = new UserController(service);

            return await controller.listUsers(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        })

        this._router.get("/:id", async (_req: Request, _res: Response) => {
            const service = new UserService<UserEntity>(PGDatabase.instance);
            const controller = new UserController(service);

            return await controller.listUser(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        })

        /** Authentication */

        this._router.use(UserGatewayCollection.AUTHENTICATION, new AuthenticationGateway().subscribe());

        return this._router;
    }
}