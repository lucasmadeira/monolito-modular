import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript"
import { InvoiceItemsModel } from "./invoice-items.model";


@Table({
    tableName: "invoice",
    timestamps: false
})
export default class InvoiceModel extends Model{

    @PrimaryKey
    @Column
    declare id:string;    
   
    @Column({allowNull:false})
    name:string;

    @Column({allowNull:false})
    document:string;  

    @HasMany(() => InvoiceItemsModel)
    declare items: InvoiceItemsModel[];

    @Column({ allowNull: false})
    declare street:string;

    @Column({ allowNull: false})
    declare number:number

    @Column({ allowNull: false})
    declare zipcode:string;

    @Column({ allowNull: false})
    declare city:string;

   
}