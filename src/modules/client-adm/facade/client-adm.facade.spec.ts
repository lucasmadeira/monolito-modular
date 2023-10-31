import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("ClientAdmFacade test", () => {
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
        try{    
            await ClientModel.destroy({ where: {}, truncate: true });        
        } catch (error) {
            console.error("Erro no Sequelize:", error);
          }    
      });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should creat a client", async() => {
       
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1"
        }

        await facade.add(input);

        const client = await ClientModel.findOne({where: {id: "1"}});

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);

    });

    it("should find a client", async() => {
        
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1"
        }

        await facade.add(input);

        const client = await facade.find({id:"1"});

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);

    });

});   