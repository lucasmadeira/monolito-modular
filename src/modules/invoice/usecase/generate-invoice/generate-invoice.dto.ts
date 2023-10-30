export interface GenerateInvoiceItemsDto {  
    name:string,
    price:number,
}

export interface GenerateInvoiceInputDto {  
    id?: string 
    name: string,
    document: string,
    items: GenerateInvoiceItemsDto[],
    street: string,
    number: number,
    city: string,    
    zip: string,    
}

export interface GenerateInvoiceOutputDto{
    invoiceId: string,
    name: string,
    document: string,
    items: GenerateInvoiceItemsDto[],
    street: string,
    number: number,
    city: string,    
    zip: string,    
}