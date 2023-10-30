import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice.items";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Address from "../../value-object/address";
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface{
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway){
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto>{
     
        const props = {
            id:  new Id(input.id) || new Id(),           
            name: input.name,
            document: input.document,
            address: new Address(input.street, input.number, input.city, input.zip),
            items: input.items.map((item) => new InvoiceItems({
                id: new Id(),
                name: item.name,
                price: item.price
            }))
        };

      

        const invoice = new Invoice(props);     
        await this._invoiceRepository.generate(invoice);

        return {
            invoiceId: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            items: invoice.items.map((item) => (
                { name:item.name,
                  price:item.price})),
            street: invoice.address.street,
            number: invoice.address.number,
            city: invoice.address.city,    
            zip: invoice.address.zip  
        }
    }

}