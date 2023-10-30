import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory{
    static create(): InvoiceFacadeInterface{
        const invoiceGateway = new InvoiceRepository();
        const generateUseCase = new GenerateInvoiceUseCase(invoiceGateway);
        const findUseCase = new FindInvoiceUseCase(invoiceGateway);
        const facade = new InvoiceFacade({generateUseCase, findUseCase});
        return facade;
    }
}