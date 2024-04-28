import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import SaleProducts from './SaleProducts.model';

@Table({
  tableName: 'sales',
})
class Sale extends Model {
  @Column({
    type: DataType.FLOAT,
  })
  declare total: number;

  @HasMany(() => SaleProducts)
  saleProducts!: SaleProducts[];
}

export default Sale;
