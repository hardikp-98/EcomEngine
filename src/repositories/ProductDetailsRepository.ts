import { injectable } from "inversify";
import { IncludeOptions, Transaction, WhereOptions } from "sequelize";

import { ProductDetailsModel } from "../models/ProductDetailsModel";

@injectable()
export class ProductDetailsRepository {
    public insert(
        body: any,
        transaction?: Transaction,
    ): Promise<any> {
        return ProductDetailsModel.create(body, { transaction });
    }

    public update(searchQuery: any, updateQuery: any, transaction?: Transaction) {
        return ProductDetailsModel.update(updateQuery, { where: searchQuery, transaction });
    }

    public findOne(searchFilter: WhereOptions, include?: IncludeOptions[]) {
        return ProductDetailsModel.findOne(
            {
                where: searchFilter,
                include
            },
        );
    }

    public async findAndCountAll(searchFilter: WhereOptions, limit: number, offset: number, include?: IncludeOptions[]) {
        try {
            const result = await ProductDetailsModel.findAndCountAll({
                where: searchFilter,
                limit,
                offset,
                include
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
    
}