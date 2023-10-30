
import { Sequelize, Transaction } from "sequelize";
import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";
import { InvoiceItemsModel } from "./invoice-items.model";
import InvoiceItems from "../domain/invoice.items";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";


export default class InvoiceRepository implements InvoiceGateway{
    
    async generate(entity: Invoice): Promise<void>{
        await InvoiceModel.create({
             id: entity.id.id,
             name: entity.name,
             document: entity.document,
             items: entity.items.map((item) => (
                { id:item.id.id, 
                  name:item.name,
                  price:item.price
                })),
             street: entity.address.street,
             number: entity.address.number,
             city: entity.address.city,    
             zipcode: entity.address.zip,                                  
        },
        { 
            include:[{model: InvoiceItemsModel}],
        });
    }   
    

    async find(id:string): Promise<Invoice>{
        let invoiceModel;
        try{
            invoiceModel = await InvoiceModel.findOne({
                where:{ id }, rejectOnEmpty: true, include:[{model: InvoiceItemsModel}],
            });

        }catch(error){
            throw new Error("Invoice not found");
        }

        const items : InvoiceItems[] = invoiceModel.items.map(
            (item) => new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            }));
        
          
        const invoice = new Invoice({
          id: new Id(id),
          name: invoiceModel.name,          
          document: invoiceModel.document,
          address: new Address(invoiceModel.street,invoiceModel.number,invoiceModel.city,invoiceModel.zipcode),
          items: items});
             
       return invoice;     
       
    }
  
}