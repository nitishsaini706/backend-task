
import express, { Request,Response,NextFunction } from "express";
import { validationResult } from "express-validator"
import { ResponseHandler } from "../contants/responseHandler";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const checkRequestValidationMiddleware = (req: express.Request, res: express.Response, next: Function) => {
    var validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
            message: "Invalid payload",
            errors: validationErrors.array()
        });
    }
    else {
        next();
    }
}

export const SECRET_KEY: Secret = 'speer-backend';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};

