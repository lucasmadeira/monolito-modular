export interface CheckStockInputDTO{
    productId: string;
}

export interface CheckStockOutputDto{
    productId:string;
    stock:number;
}