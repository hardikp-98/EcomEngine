import { Sequelize } from "sequelize-typescript";
import { models } from "../models";
const globalAny: any = global;

class Database extends Sequelize {
    private static _instance: Database;

    //check with dev connection
    constructor() {
        super({
            dialect: "postgres",
            host: globalAny.CONFIGURATION.config.DB_HOST,
            port: globalAny.CONFIGURATION.config.DB_PORT,
            database: globalAny.CONFIGURATION.config.DB_NAME,
            username: globalAny.CONFIGURATION.config.DB_USERNAME,
            password: globalAny.CONFIGURATION.config.DB_PASSWORD,
            logging: false,
            models,
            define: {
                schema: globalAny.CONFIGURATION.config.DB_SCHEMA // Specify the default schema
            }
        });
    }

    public static getInstance(): Database {
        if (!this._instance) {
            this._instance = new Database();
        }

        this._instance.sync();
        return this._instance;
    }
}

export const ECOMDatabase = Database.getInstance();