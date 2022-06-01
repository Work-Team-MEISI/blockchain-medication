import "mocha";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Main } from "./../../../../../main";
import { CodeCollection } from "../../../../../shared/constants/collections/code.collection";

chai.use(chaiHttp);

describe("Fetch User", () => {
    it("should have a (200) STATUS", async () => {
        const user = await chai.request(Main).get("/users/1");

        chai.expect(user).status(CodeCollection.OK);
    });

    it("should have a (404) STATUS", async () => {
        const user = await chai.request(Main).get("/users/2");

        chai.expect(user).status(CodeCollection.NOT_FOUND);
    });
});