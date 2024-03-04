import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { verify } from "jsonwebtoken";
const axios = require('axios');

const globalAny: any = global;

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    
    public async handler(req: Request, res: Response, next: NextFunction) {    
        const authorization = req.headers["authorization"];
        try {
            const token = authorization && authorization.split(" ")[1];
            if (!token) throw new Error("Authorization token required.");
            const decodedToken: any = verify(token, globalAny.CONFIGURATION.config.JWT_SECRETKEY);
            if (decodedToken) {
                next();
            }
            else throw new Error ('Authorization token invalid.')
        } catch (err: any) {
            next(err);
        }
    }
}