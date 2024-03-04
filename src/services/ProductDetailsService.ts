import { inject, injectable } from "inversify";
import { IncludeOptions, Transaction, WhereOptions } from "sequelize";
import { SERVICE_IDENTIFIER } from "../serviceIdentifier";
import { ProductDetailsModel } from "../models/ProductDetailsModel";
import { ProductDetailsRepository } from "../repositories/ProductDetailsRepository";

@injectable()
export class ProductDetailsService {
    @inject(SERVICE_IDENTIFIER.ProductDetailsRepository)
    private readonly productDetailsRepository: ProductDetailsRepository;

    public insert(
        body: any,
        transaction?: Transaction,
    ): Promise<any> {
        return this.productDetailsRepository.insert(body, transaction);
    }

    public update(searchQuery: any, updateQuery: any, transaction?: Transaction) {
        return this.productDetailsRepository.update(updateQuery, { where: searchQuery, transaction });
    }

    public findOne(searchQuery: any): Promise<any> {
        return this.productDetailsRepository.findOne(searchQuery);
    }

    public async findAndCountAll(searchQuery: any, limit: number, offset: number): Promise<{ count: number, rows: any }> {
        try {
            const result = await this.productDetailsRepository.findAndCountAll(searchQuery, limit, offset);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
}

