export interface GenerateInvoiceFacedeItemsDto {  
    name:string;
    price:number;
}

export interface GenerateInvoiceFacadeInputDto{
    id?: string;
    name:string;
    document:string;
    items: GenerateInvoiceFacedeItemsDto[]
    street: string;
    number: number;
    city: string;    
    zip: string;    
}

export interface FindInvoiceFacadeInputDto{
    id:string;
}

export interface FindInvoiceFacadeOutputDto{
    id:string;
    name:string;
    document:string;
    items: GenerateInvoiceFacedeItemsDto[]
    address:string;
    street: string;
    number: number;
    city: string;    
    zip: string;    
}

export default interface InvoiceFacadeInterface {
    generate(input: GenerateInvoiceFacadeInputDto): Promise<void>
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>
}