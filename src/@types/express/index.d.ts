import { config } from "dotenv";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

declare global {
    namespace NodeJS {
        interface Global {
            CONFIGURATION: Document;
        }
    }
}