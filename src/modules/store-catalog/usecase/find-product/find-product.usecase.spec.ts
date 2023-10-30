import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 100
})


const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("find product usecase unit test", () => {
    it("should find a product", async() =>{
        const productRepository = mockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const result = await usecase.execute({id:"1"});

        expect(productRepository.find).toHaveBeenCalled();        
        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Product 1 description");
        expect(result.salesPrice).toBe(100);
    })
})