import { Router, Request, Response } from "express";
import { IGateway } from "../../shared/interfaces/gateway.interface";

export class MedicationGateway implements IGateway {
    private readonly _router: Router;

    public constructor() {
        this._router = Router();
    }

    public subscribe(): Router {
        this._router.get("", (_req: Request, _res: Response) => { });

        this._router.get("/:id", (_req: Request, _res: Response) => { });

        this._router.post("", (_req: Request, _res: Response) => { });

        this._router.put("/:id", (_req: Request, _res: Response) => { });

        return this._router;
    }
}