import { Router } from "express";

export interface IGateway {
    subscribe(): Router;
}