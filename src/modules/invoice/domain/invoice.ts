import { Unique } from "sequelize-typescript";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "./invoice.items";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[],
}


export default class Invoice extends BaseEntity implements AggregateRoot{
    private _name: string
    private _document: string
    private _address: Address // value object
    private _items: InvoiceItems[] // Invoice Items entity

    constructor(props:InvoiceProps){
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;    
        this.validate();
     }

     validate():void{
        if(this._address == undefined){
            throw new Error("the address must be provided");
        }

        if(this._items == undefined || this._items.length ==0){
            throw new Error("the items must be provided");
        }
     }

     get name():string{
        return this._name;
     }

     get document():string{
        return this._document;
     }

     get address(): Address{
        return this._address;
     }

     get items(): InvoiceItems[]{
        return this._items;
     }
}