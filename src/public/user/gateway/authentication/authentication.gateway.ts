import { Request, Response, Router } from "express";
import { PGDatabase } from "../../../../core/database/engines/pg.database";
import { JWTService } from "../../../../core/services/jwt.service";
import { IGateway } from "../../../../shared/interfaces/gateway.interface";
import { UserEntity } from "../../structs/user.entity";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationGatewayCollection } from "./constants/authentication.gateway.collection";
import { AuthenticationService } from "./services/authentication.service";

export class AuthenticationGateway implements IGateway {
    private readonly _router: Router;

    public constructor() {
        this._router = Router();
    }

    public subscribe(): Router {
        this._router.post(AuthenticationGatewayCollection.SIGN_IN, async (_req: Request, _res: Response) => {
            const service = new AuthenticationService<UserEntity>(PGDatabase.instance);
            const controller = new AuthenticationController(service);

            return await controller.signIn(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        });

        this._router.post(AuthenticationGatewayCollection.SIGN_UP, async (_req: Request, _res: Response) => {
            const service = new AuthenticationService<UserEntity>(PGDatabase.instance);
            const controller = new AuthenticationController(service);

            return await controller.signUp(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        });

        this._router.put(AuthenticationGatewayCollection.SIGN_OUT, JWTService.instance!.checkAccessToken, async (_req: Request, _res: Response) => {
            const service = new AuthenticationService<UserEntity>(PGDatabase.instance);
            const controller = new AuthenticationController(service);

            return await controller.signOut(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        });

        this._router.put(AuthenticationGatewayCollection.FORGOT_PASSWORD, async (_req: Request, _res: Response) => {
            const service = new AuthenticationService<UserEntity>(PGDatabase.instance);
            const controller = new AuthenticationController(service);

            return await controller.forgotPassword(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        });

        this._router.put(AuthenticationGatewayCollection.REFRESH_TOKEN, JWTService.instance!.checkRefreshToken, async (_req: Request, _res: Response) => {
            const service = new AuthenticationService<UserEntity>(PGDatabase.instance);
            const controller = new AuthenticationController(service);

            return await controller.refreshToken(_req, _res).catch((error) => {
                return _res.status(error.status).json(error.message);
            });
        });

        return this._router;
    }

}