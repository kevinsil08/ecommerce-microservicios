import { Table, Column, DataType, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({
   timestamps: true,
   tableName: "notification",
   modelName: "Notification"
})

export class Notification extends Model {

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
    type: DataType.TEXT,
    allowNull: false,
  })
  message!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_read!: boolean;

}