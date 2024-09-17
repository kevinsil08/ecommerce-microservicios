import { Table, Column, DataType, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({
   timestamps: true,
   tableName: "user",
   modelName: "User"
})

export class User extends Model {

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
   username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  salt!: string;
  
}