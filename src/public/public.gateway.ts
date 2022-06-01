import { Router } from "express";
import { PublicGatewayCollection } from "../shared/constants/collections/public.gateway.collection";
import { IGateway } from "../shared/interfaces/gateway.interface";
import { UserGateway } from "./user/user.gateway";

export class PublicGateway implements IGateway {
    private readonly _router: Router;

    public constructor() {
        this._router = Router();
    }

    public subscribe(): Router {
        this._router.use(PublicGatewayCollection.USERS, new UserGateway().subscribe());

        return this._router;
    }
}