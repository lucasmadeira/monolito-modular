import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";

describe("Client Repository test", () => {
    let sequelize: Sequelize;

    beforeAll(async() => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory",
           logging: false,
           sync: {force: true}     
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {       
        await ClientModel.destroy({ where: {}, truncate: true });        
      });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async() => {
       const clientProps = {            
            name: "Client 1",
            email: "Client 1 description",
            address: "Address 1"
       };
       
       const client = new Client(clientProps);
       const clientRepository = new ClientRepository();
       await clientRepository.add(client);

       const clientDb = await ClientModel.findOne({
        where: {id: client.id.id}
       });

       expect(client.id.id).toEqual(client.id.id);
       expect(client.name).toEqual(client.name);
       expect(client.email).toEqual(client.email);
       expect(client.address).toEqual(client.address);
    });

    it("should find a client", async() =>{
        const clientRepository = new ClientRepository();

        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await clientRepository.find("1");

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);        
    })
})