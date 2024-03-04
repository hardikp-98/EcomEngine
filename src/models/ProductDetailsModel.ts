import {
    Model,
    Table,
    Column,
    DataType,
    CreatedAt,
    UpdatedAt,
    Index
} from "sequelize-typescript";
import { Sequelize } from "sequelize";

interface IProductDetailsModel {
    srno:number;
    product_id: string;
    product_name: string;
    description: string;
    price: number;
    stock: number;
}

@Table({ tableName: "product_details" })
export class ProductDetailsModel
    extends Model<IProductDetailsModel, IProductDetailsModel>
    implements IProductDetailsModel {
    @Column({ type: DataType.UUID, primaryKey: true, allowNull: false, defaultValue: DataType.UUIDV4 })
    id: string;

    @Column({ field: "srno", type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    srno: number;

    @Index
    @Column({ field: "product_id", unique:true, primaryKey: true, type: DataType.STRING })
    product_id: string;

    @Column({ field: "product_name", type: DataType.STRING })
    product_name: string;

    @Column({ field: "description", type: DataType.STRING })
    description: string;

    @Column({ field: "price", type: DataType.FLOAT })
    price: number;

    @Column({ field: "stock", type: DataType.INTEGER })
    stock: number;

    @Column({ field: "is_active", type: DataType.BOOLEAN })
    is_active: Boolean;

    @Column({ field: "created_at", type: DataType.DATE, defaultValue: Sequelize.fn('NOW') })
    @CreatedAt
    created_at: Date;

    @Column({ field: "updated_at", type: DataType.DATE, defaultValue: Sequelize.fn('NOW') })
    @UpdatedAt
    updated_at: Date;
}
