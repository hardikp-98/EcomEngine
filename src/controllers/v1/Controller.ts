import { inject } from "inversify";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    next,
    requestBody,
    requestHeaders,
    requestParam
} from "inversify-express-utils";
import { SERVICE_IDENTIFIER } from "../../serviceIdentifier";
import { ProductDetailsAggregator } from "../../_aggregator/Aggregator";
import { Response as ExpressResponse, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const globalAny: any = global;


@controller("/v1")
export class Controller {
    @inject(SERVICE_IDENTIFIER.ProductDetailsAggregator)
    private readonly productDetailsAggregator: ProductDetailsAggregator;

    @httpGet("/ping")
    async ProductDetails(
        @next() next: NextFunction
    ) {
        try {
            const data = `200 - OK - Server is running`
            return { success: true, data };
        } catch (err) {
            next(err);
        }
    }

    @httpPost("/login")
    async login(
        @requestHeaders("username") username : string ,
        @requestHeaders("password") password: string ,
        @next() next: NextFunction
    ) {
        try {
            if (username === globalAny.CONFIGURATION.config.LOGIN_USERNAME && password === globalAny.CONFIGURATION.config.LOGIN_PASSWORD) {
                const token = jwt.sign({ username }, globalAny.CONFIGURATION.config.JWT_SECRETKEY, { expiresIn: globalAny.CONFIGURATION.config.JWT_EXPIREIN });
                return { success: true, jwt_token: token, expiresIn: globalAny.CONFIGURATION.config.JWT_EXPIREIN  };
            } else {
                return { success: false, message : 'Invalid Credentials' };
            }
        } catch (err) {
            next(err);
        }
    }


    @httpPost("/addproduct", SERVICE_IDENTIFIER.AuthMiddleware)
    async ProductCreate(
        @requestBody() body: any,
        @next() next: NextFunction
    ) {
        try {
            const data = await this.productDetailsAggregator.addProduct(body)
            return { success: true, data };
        } catch (err) {
            next(err);
        }
    }

    @httpDelete("/deleteproduct/:productid", SERVICE_IDENTIFIER.AuthMiddleware)
    async ProductDelete(
        @requestParam("productid") productid : any,
        @next() next: NextFunction
    ) {
        try {
            const data = await this.productDetailsAggregator.deleteProduct({productid})
            return { success: true, data };
        } catch (err) {
            next(err);
        }
    }

    @httpPut("/updateproduct/:productid", SERVICE_IDENTIFIER.AuthMiddleware)
    async ProductUpdate(
        @requestBody() body: any,
        @requestParam("productid") productid : any,
        @next() next: NextFunction
    ) {
        try {
            const data = await this.productDetailsAggregator.updateProduct({productid}, body)
            return { success: true, data };
        } catch (err) {
            next(err);
        }
    }

    
    @httpGet("/getproduct/:productid", SERVICE_IDENTIFIER.AuthMiddleware)
    async ProductGet(
        @requestParam("productid") productid : any,
        @next() next: NextFunction
    ) {
        try {
            const data = await this.productDetailsAggregator.getProduct({productid})
            return { success: true, data };
        } catch (err) {
            next(err);
        }
    }


    @httpGet('/list/all/:page/:pageSize', SERVICE_IDENTIFIER.AuthMiddleware)
    async ProductDetailList(
        @requestParam('page') page: number | undefined,
        @requestParam('pageSize') pageSize: number | undefined,
        @next() next: NextFunction
    ) {
        try {
            const data = await this.productDetailsAggregator.getAllProduct({ page, pageSize });
            return { success: true, data };
        } catch (err) {
            next(err);
        }
    }

    
}