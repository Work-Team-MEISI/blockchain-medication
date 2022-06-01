import { Request, Response } from "express";
import { CodeCollection } from "../../../../shared/constants/collections/code.collection";
import { UserEntity } from "../../structs/user.entity";
import { IAuthenticationService } from "./authentication.service.interface";
import { SignInDTO } from "./dtos/sign-in.dto";
import * as bcrypt from "bcrypt";
import { CreateResponseModel } from "../../../../shared/models/responses/create.response.model";
import { TokenModel } from "../../../../shared/models/token.model";
import { JWTService } from "../../../../core/services/jwt.service";
import { SignUpDTO } from "./dtos/sign-up.dto";
import { UserModel } from "../../structs/user.model";
import { IGetUserAuthRequest } from "../../../../shared/interfaces/get-user-auth-info-request.interface";
import { UpdateResponseModel } from "../../../../shared/models/responses/update.response.model";

export class AuthenticationController {
    public constructor(
        private readonly _service: IAuthenticationService<UserEntity>,
    ) { }

    public async signIn(_req: Request, _res: Response): Promise<Response> {
        const signInDTO = new SignInDTO(
            _req.body['email'],
            _req.body['password'],
        );

        const user = await this._service.fetchOne({ email: signInDTO.email }).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error }
        })

        if (user === null || user === undefined) {
            throw { status: CodeCollection.NOT_FOUND };
        }

        const comparedPassword = await bcrypt.compare(signInDTO.password, user.password).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        if (comparedPassword === false) {
            throw { status: CodeCollection.BAD_REQUEST };
        }

        const tokenModel = await JWTService.instance!.signTokens(user.email, user.userId).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        });

        const hashedRefreshToken = await JWTService.instance!.hashRefreshToken(tokenModel.refreshToken).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        await this._updateHashedRefreshToken(user.userId, hashedRefreshToken).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        return _res.status(CodeCollection.UPDATED).json(new CreateResponseModel<{ user: UserEntity, tokens: TokenModel }>(
            user.userId,
            { user: user, tokens: tokenModel },
            null,
        ));
    }

    public async signUp(_req: Request, _res: Response): Promise<Response> {
        const signUpDTO = new SignUpDTO(
            _req.body['username'],
            _req.body['email'],
            _req.body['password'],
            _req.body['firstName'],
            _req.body['lastName'],
        );

        const user = await this._service.fetchOne({ email: signUpDTO.email }).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        if (user !== null && user !== undefined) {
            throw { status: CodeCollection.CONFLICT };
        }

        const userModel = new UserModel(
            signUpDTO.email,
            signUpDTO.username,
            signUpDTO.password,
            signUpDTO.firstName,
            signUpDTO.lastName,
            null
        )

        await this._service.createOne(userModel).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error }
        })

        const createdUser = await this._service.fetchOne({ email: signUpDTO.email }).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        return _res.status(CodeCollection.CREATED).json(new CreateResponseModel<UserEntity>(userModel.userId!, createdUser, null));
    }

    public async signOut(_req: Request, _res: Response): Promise<Response> {
        const formatedRequest = _req as IGetUserAuthRequest;

        const userId = formatedRequest.user['sub'];

        const user = await this._service.fetchOne({ userId: userId }).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        if (user === null || user === undefined) {
            throw { status: CodeCollection.NOT_FOUND };
        }

        if (user.hashedRefreshToken === null) {
            throw { status: CodeCollection.BAD_REQUEST };
        }

        await this._updateHashedRefreshToken(userId, null).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        return _res.status(CodeCollection.UPDATED).json();
    }

    public async forgotPassword(_req: Request, _res: Response): Promise<Response> {
        throw "";
    }

    public async refreshToken(_req: Request, _res: Response): Promise<Response> {
        const formatedRequest = _req as IGetUserAuthRequest;

        const email = formatedRequest.user['email'];
        const userId = formatedRequest.user['sub'];

        const tokenModel = await JWTService.instance!.signTokens(email, userId).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        });

        const hashedRefreshToken = await JWTService.instance!.hashRefreshToken(tokenModel.refreshToken).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        await this._updateHashedRefreshToken(userId, hashedRefreshToken).catch((error) => {
            throw { status: CodeCollection.SERVER_ERROR, message: error };
        })

        return _res.status(CodeCollection.UPDATED).json(new UpdateResponseModel<TokenModel>(
            userId,
            tokenModel,
            null,
            null
        ));
    }

    /** Utility */

    private async _updateHashedRefreshToken(userId: string, hashedRefreshToken: string | null): Promise<void> {
        return await this._service.updateOne({ userId: userId }, { hashedRefreshToken: hashedRefreshToken }).catch((error) => error);
    }

}