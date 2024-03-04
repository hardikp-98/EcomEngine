import "reflect-metadata";
import cors from "cors";
import { Application, json, urlencoded } from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import "./controllers/v1/routes";
import { SERVICE_IDENTIFIER } from "./serviceIdentifier";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { ProductDetailsService } from "./services/ProductDetailsService";
import { ProductDetailsRepository } from "./repositories/ProductDetailsRepository";
import { ProductDetailsAggregator } from "./_aggregator/Aggregator";
import { CreateError } from "./middlewares/CreateErrorMiddleware";

export class InversifyServer {
    private readonly _port: number;

    constructor(port: number) {
        this._port = port;
    }

    public start() {
        const container = new Container();

        container.bind<AuthMiddleware>(SERVICE_IDENTIFIER.AuthMiddleware).to(AuthMiddleware);

        // services
        container.bind<ProductDetailsService>(SERVICE_IDENTIFIER.ProductDetailsService).to(ProductDetailsService).inSingletonScope();

        // repositores
        container.bind<ProductDetailsRepository>(SERVICE_IDENTIFIER.ProductDetailsRepository).to(ProductDetailsRepository).inSingletonScope();
        
        // aggregators
        container.bind<ProductDetailsAggregator>(SERVICE_IDENTIFIER.ProductDetailsAggregator).to(ProductDetailsAggregator).inSingletonScope();


        const server = new InversifyExpressServer(container, null, {
            rootPath: "/api",
        });

        return server
            .setConfig((app) => this.middlewares(app))
            .setErrorConfig((app) => app.use(CreateError.defineErrors))
            .build()
            .listen(this._port, () => {
                console.log(`Server running on port ${this._port}`);
            });
    }

    private middlewares(app: Application): void {
        app.use(json());
        app.use(urlencoded({ extended: false }));
        app.use(morgan("dev"));
        app.use(cors());
    }


}
