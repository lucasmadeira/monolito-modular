export interface FindInvoiceItemsDto {  
    name:string;
    price:number;
}

export interface FindInvoiceInputDto {  
    id:string;
}


export interface FindInvoiceOutputDto {  
    id:string;
    name: string;
    document: string;
    items: FindInvoiceItemsDto[],
    street: string;
    number: number;
    city: string;    
    zip: string;    
}