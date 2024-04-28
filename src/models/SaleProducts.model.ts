import Sale from './Sale.model';
import Product from './Product.model';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  tableName: 'sale_products',
})
class SaleProducts extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @ForeignKey(() => Sale)
  @Column({
    type: DataType.INTEGER,
  })
  sale_id!: number;
  @BelongsTo(() => Sale)
  sale!: Sale;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id!: number;
  @BelongsTo(() => Product)
  product!: Product;
}

export default SaleProducts;
