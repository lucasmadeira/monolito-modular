import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

export interface UseCaseProps{
    generateUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{

    private _generateUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecasesProps: UseCaseProps){
        this._generateUsecase = usecasesProps.generateUseCase;
        this._findUsecase = usecasesProps.findUseCase;
    }


   async generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
       return await this._generateUsecase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }

}