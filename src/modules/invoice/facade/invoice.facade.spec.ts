import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import { InvoiceItemsModel } from "../repository/invoice-items.model";
import InvoiceFacadeFactory from "../factory/InvoiceFacadeFactory";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

    beforeAll(async() => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory",
           logging: false,
           sync: {force: true}     
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {       
        await InvoiceItemsModel.destroy({ where: {}, truncate: true });
        await InvoiceModel.destroy({ where: {}, truncate: true });        
      });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should generate an invoice", async() => {

        
       
        const facade = InvoiceFacadeFactory.create();

        const input = {  
            id: "1",         
            name: "Invoice 1",
            document: "document",
            items: [{
                name: "product 1",
                price: 25.00
            }],
            street: "street",
            number: 30.00,
            city:"city",
            zip: "zip"
        }

        await facade.generate(input);

        const invoice = await InvoiceModel.findOne({where: {id: "1"}, include: InvoiceItemsModel});

        expect(invoice).toBeDefined();
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.items[0].name).toBe("product 1");
        expect(invoice.items[0].price).toBe(25.00);
        expect(invoice.street).toBe(input.street)
        expect(invoice.number).toBe(input.number)
        expect(invoice.city).toBe(input.city)
        expect(invoice.zipcode).toBe(input.zip)

    });

    it("should find an invoice", async() => {
        const facade = InvoiceFacadeFactory.create();
        
        const input = {  
            id: "1",         
            name: "Invoice 1",
            document: "document",
            items: [{
                name: "product 1",
                price: 25.00
            }],
            street: "street",
            number: 30.00,
            city:"city",
            zip: "zip"
        }

        await facade.generate(input);

        const invoice = await facade.find({id: "1"})

        expect(invoice).toBeDefined();
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.items[0].name).toBe("product 1");
        expect(invoice.items[0].price).toBe(25.00);
        expect(invoice.street).toBe(input.street)
        expect(invoice.number).toBe(input.number)
        expect(invoice.city).toBe(input.city)
        expect(invoice.zip).toBe(input.zip)

    });

});   