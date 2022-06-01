import { TokenModel } from "../../shared/models/token.model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { EnvService } from "./env.service";
import { NextFunction, Request, Response } from "express";
import { CodeCollection } from "../../shared/constants/collections/code.collection";

export class JWTService {
    private static _instance: JWTService | null = null;

    private constructor() { }

    public static get instance(): JWTService | null {
        if (this._instance === null) {
            this._instance = new JWTService();
        }

        return this._instance;
    }

    public async signTokens(email: string, sub: string): Promise<TokenModel> {
        const [accessToken, refreshToken] = await Promise.all([
            await jwt.sign({ email: email, sub: sub }, EnvService.instance.jwtAccessTokenSecret, { expiresIn: '1d' }),
            await jwt.sign({ email: email, sub: sub }, EnvService.instance.jwtRefreshTokenSecret, { expiresIn: '7d' }),
        ]).catch((error) => error);

        return new TokenModel(accessToken, refreshToken);
    }

    public async hashRefreshToken(refreshToken: string): Promise<string> {
        return await bcrypt.hash(refreshToken, 10).catch((error) => error);
    }

    public checkAccessToken(_req: Request, _res: Response, _next: NextFunction): Response | void {
        const authorizationHeader = _req.get("authorization") ?? null;

        if (authorizationHeader === null) {
            return _res.status(CodeCollection.UNAUTHORIZED).json();
        }

        const token = authorizationHeader.replace("Bearer", "").trim()

        jwt.verify(token, EnvService.instance.jwtAccessTokenSecret, (error, user) => {
            if (error !== null) {
                return _res.status(CodeCollection.FORBIDDEN).json(error);
            }

            return Object.assign(_req, { user: user });
        });

        _next();
    }

    public checkRefreshToken(_req: Request, _res: Response, _next: NextFunction): Response | void {
        const authorizationHeader = _req.get("authorization") ?? null;

        if (authorizationHeader === null) {
            return _res.status(CodeCollection.UNAUTHORIZED).json();
        }

        const token = authorizationHeader.replace("Bearer", "").trim()

        jwt.verify(token, EnvService.instance.jwtRefreshTokenSecret, (error, user) => {
            if (error !== null) {
                return _res.status(CodeCollection.FORBIDDEN).json(error);
            }

            const newUser = Object.assign(user!, { refreshToken: token });

            return Object.assign(_req, { user: newUser });
        });

        _next();
    }
}