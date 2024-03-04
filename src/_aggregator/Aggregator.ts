import { inject, injectable } from "inversify";

import { SERVICE_IDENTIFIER } from "../serviceIdentifier";
import { ProductDetailsService } from "../services/ProductDetailsService"
import { ECOMDatabase } from "../database/db";
import { Transaction } from "sequelize";

@injectable()
export class ProductDetailsAggregator {
    @inject(SERVICE_IDENTIFIER.ProductDetailsService)
    private readonly ProductDetailsService: ProductDetailsService;

    
    public async addProduct(body: any): Promise<any> {
    try {

        const searchQuery: any = { product_id : body.product_id , is_active: true};
        const checkRecord = await this.ProductDetailsService.findOne( searchQuery );
        if(checkRecord) throw new Error ('Product already exist.');

        return ECOMDatabase.transaction(async (transaction) => {
            const res = await this.ProductDetailsService.insert({
            product_id :body.product_id,
            product_name :body.product_name,
            description :body.description,
            price :body.price,
            stock :body.stock,
            is_active:true,
            },transaction);
            return { message : `Product added with srno ${res.srno}`   }
        });
    }
     catch (err:any) {
        throw { statusCode: 400, message: err.message, stack: err?.stack };;
    }
    }

    public async deleteProduct(param: any): Promise<any> {
        try {
            const searchQuery: any = {  product_id: param.productid , is_active: true };
            const checkRecord = await this.ProductDetailsService.findOne( searchQuery );
            if(!checkRecord) throw new Error ('Record not found');

            const transaction = await ECOMDatabase.transaction();

            await this.ProductDetailsService.update(
                { product_id: param.productid },
                {
                    is_active:false
                },
                transaction);

            await transaction.commit();
            return { message : `Product deleted successfully with product id ${param.productid}`};
        }
         catch (err:any) {
            throw { statusCode: 400, message: err.message, stack: err?.stack };
        }
        }

        public async updateProduct(param: any, body: any): Promise<any>{
            try {
                const searchQuery: any = {  product_id: param.productid , is_active: true };
                const checkRecord = await this.ProductDetailsService.findOne( searchQuery );
                if(!checkRecord) throw new Error ('Record not found');

                const transaction = await ECOMDatabase.transaction();
    
                await this.ProductDetailsService.update(
                    { product_id: param.productid },
                    {
                        product_name :body.product_name,
                        description :body.description,
                        price :body.price,
                        stock :body.stock,
                    },
                    transaction);
    
                await transaction.commit();
                return { message : `Product updated successfully with product id  ${param.productid}`};
            }
             catch (err:any) {
                throw { statusCode: 400, message: err.message, stack: err?.stack };;
            }
        }

        public async getProduct(param: any): Promise<any>{
            try {
                const searchQuery: any = {  product_id: param.productid , is_active: true };
                const checkRecord = await this.ProductDetailsService.findOne( searchQuery );
                if(!checkRecord) throw new Error ('Record not found');
                return checkRecord;
            }
            catch (err:any) {
                throw { statusCode: 400, message: err.message, stack: err?.stack };;
            }
        }

        public async getAllProduct(param: any): Promise<any>{
            try {
                const page = param.page ? parseInt(param.page) : 1;
                const pageSize = param.pageSize ? parseInt(param.pageSize) : 10;
                const offset = (page - 1) * pageSize;
                const rows = await this.ProductDetailsService.findAndCountAll({is_active: true}, pageSize, offset);
                const result : any = {}
                result.pagefilter = param;
                result.rowData = [...rows.rows];
                return { data: result };
            } catch (err: any) {
                throw { statusCode: 400, message: err.message, stack: err?.stack };
            }
        }
        


    
}