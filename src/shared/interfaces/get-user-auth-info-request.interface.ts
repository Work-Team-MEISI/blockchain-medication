import { Request } from "express";
import { PayloadModel } from "../models/payload.model";

export interface IGetUserAuthRequest extends Request {
    user: PayloadModel;
}