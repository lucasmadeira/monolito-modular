import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import { InvoiceItemsModel } from "./invoice-items.model";
import InvoiceRepository from "./invoice.repository";
import Address from "../value-object/address";
import Invoice from "../domain/invoice";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice.items";

describe("Invoice repository test", () =>{

    let sequelize: Sequelize;

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });
        sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    }); 

    it("should generate an invoice", async () =>{

                
        const invoiceItem = new InvoiceItems({
            id: new Id("1"),
            name: "produto1",
            price: 25.00});

        const invoiceRepository = new InvoiceRepository();        
        const address = new Address("Street 1",1, "Zipcode1","City 1");
        const invoice = new Invoice({
            id: new Id("1"),
            name: "invoice1",
            document:"documento",
            address: address,
            items: [invoiceItem],

        });
        await invoiceRepository.generate(invoice);


        const invoiceModel = await InvoiceModel.findOne({
            where: {id: invoice.id.id},
            include: ["items"],
        })

        expect(invoiceModel.toJSON()).toStrictEqual({
            id:"1",
            name: "invoice1",
            document: "documento",
            items:[
                {
                   id:invoiceItem.id.id,
                   invoice_id: invoice.id.id, 
                   name: invoiceItem.name,
                   price: invoiceItem.price,
                },
            ],
            street:address.street,
            number:address.number,
            zipcode:address.zip,
            city:address.city        
        });

    });

    it("should find a invoice", async() =>{
      
        const invoiceItem = new InvoiceItems({
            id: new Id("1"),
            name: "produto1",
            price: 25.00});

        const invoiceRepository = new InvoiceRepository();        
        const address = new Address("Street 1",1, "Zipcode1","City 1");
        const invoice = new Invoice({
            id: new Id("1"),
            name: "invoice1",
            document:"documento",
            address: address,
            items: [invoiceItem],
        });
        await invoiceRepository.generate(invoice);
       
       
        const invoiceResult = await invoiceRepository.find(invoice.id.id);
       

        expect(invoice.id).toEqual(invoiceResult.id);
        expect(invoice.name).toEqual(invoiceResult.name);
        expect(invoice.document).toEqual(invoiceResult.document);
        expect(invoice.items).toEqual(invoiceResult.items);
        expect(invoice.address).toEqual(invoiceResult.address);
       
    });
    

});