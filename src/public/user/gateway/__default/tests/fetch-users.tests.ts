import "mocha";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Main } from "./../../../../../main";
import { CodeCollection } from "../../../../../shared/constants/collections/code.collection";

chai.use(chaiHttp);

describe("Fetch Users", () => {
    it("should have a (200) STATUS", async () => {
        const user = await chai.request(Main).get("/users");

        chai.expect(user).status(CodeCollection.OK);
    });
});