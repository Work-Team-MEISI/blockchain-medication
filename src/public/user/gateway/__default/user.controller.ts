import { Request, Response } from "express";
import { CodeCollection } from "../../../../shared/constants/collections/code.collection";
import { FetchResponseModel } from "../../../../shared/models/responses/fetch.response.model";
import { UserEntity } from "../../structs/user.entity";
import { IUserService } from "./user.service.interface";

export class UserController {
    public constructor(
        private readonly _service: IUserService<UserEntity>,
    ) { }

    public async listUsers(_req: Request, _res: Response): Promise<Response> {
        const users = await this._service.fetchBulk().catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error }
        })

        const responses: Array<FetchResponseModel<UserEntity>> = new Array<FetchResponseModel<UserEntity>>();

        for (const user of users) {
            responses.push(new FetchResponseModel<UserEntity>(user.userId, user));
        }

        return _res.status(200).json(responses);
    };

    public async listUser(_req: Request, _res: Response): Promise<Response> {
        const user = await this._service.fetchOne({ userId: _req.params['id'] }).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error }
        });

        if (user === null || user === undefined) {
            throw { status: CodeCollection.NOT_FOUND, message: "" }
        }

        const response: FetchResponseModel<UserEntity> = new FetchResponseModel<UserEntity>(
            user.userId,
            user
        );

        return _res.status(200).json(response);
    }
}