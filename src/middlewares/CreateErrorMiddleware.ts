import { NextFunction, Request, Response } from "express";


export class CreateError {
    public static defineErrors(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        console.log("============Error============");
        console.log(err);
        console.log("<<=========================>>");

        
        return res.status(err.statusCode || 500).json({
            success: false,
            error: {
                messages: err?.message || "Internal Server Error",
                stack: err?.stack || ''
            },
            results: null,
        });
    }
}
