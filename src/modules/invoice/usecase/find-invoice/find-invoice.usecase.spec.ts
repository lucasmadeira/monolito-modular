import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice.items";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

const itemInvoice = new InvoiceItems({
    id:new Id("1"),
    name: "item 1",
    price: 100,
})

const invoice = new Invoice({
    id: new Id("1"),
    name: "invoice 1",
    document: "document 1",
    items: [itemInvoice],
    address: new Address("street", 88,"city","zip")    
});

const MockRepository = () =>{
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
};

describe("Find Invoice Usecase unit test", () =>{
    it("should find an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {          
            id:"1",
        }

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.city).toBe(invoice.address.city);
        expect(result.street).toBe(invoice.address.street);
        expect(result.number).toBe(invoice.address.number);
        expect(result.zip).toBe(invoice.address.zip);       
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);

    })
});