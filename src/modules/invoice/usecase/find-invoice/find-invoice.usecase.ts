import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface{
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway){
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {        
        const result = await this._invoiceRepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            items: result.items.map((item) => (
                { name:item.name,
                  price:item.price})),
            street: result.address.street,
            number: result.address.number,
            city: result.address.city,    
            zip: result.address.zip  
        }
    }

}