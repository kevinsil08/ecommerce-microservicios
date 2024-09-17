import { Table, Column, DataType, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({
   timestamps: true,
   tableName: "product",
   modelName: "Product"
})

export class Product extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })

  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock_quantity!: number;
  
}