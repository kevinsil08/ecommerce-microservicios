import { Table, Column, DataType, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({
   timestamps: true,
   tableName: "payment",
   modelName: "Payment"
})

export class Payment extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })

  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status!: string;

}