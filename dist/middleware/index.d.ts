import express, { Request, Response, NextFunction } from "express";
import { Secret, JwtPayload } from 'jsonwebtoken';
export declare const checkRequestValidationMiddleware: (req: express.Request, res: express.Response, next: Function) => express.Response<any, Record<string, any>> | undefined;
export declare const SECRET_KEY: Secret;
export interface CustomRequest extends Request {
    token: string | JwtPayload;
}
export declare const auth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
