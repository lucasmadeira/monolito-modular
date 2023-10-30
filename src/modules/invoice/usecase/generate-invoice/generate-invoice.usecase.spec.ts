import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () =>{
    return {
        generate: jest.fn(),
        find: jest.fn()
    };
};

describe("Generate Invoice Usecase unit test", () =>{
    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const invoiceItem = {
            name: "product 1",
            price: 25.00
        }


        const invoiceItem2 = {
            name: "product 2",
            price: 22.00
        }

        const input = {          
            name: "Invoice 1",
            document: "Document",
            items: [invoiceItem, invoiceItem2],
            street: "Rua do sambura",
            number: 88,
            city: "Campo Grande",    
            zip: "79013-600",    
        }

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.invoiceId).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.city).toBe(input.city);
        expect(result.items[0].name).toBe(invoiceItem.name);
        expect(result.items[0].price).toBe(invoiceItem.price);
        expect(result.items[1].name).toBe(invoiceItem2.name);
        expect(result.items[1].price).toBe(invoiceItem2.price);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.zip).toBe(input.zip);

        
    })
});