import { expect } from "chai";
import { ethers } from "hardhat";
import {Collection, Collection__factory} from "../typechain-types";

describe("Mint token", function () {
    let collection: Collection;
    it("should deploy Contract", async function () {
        const [address1, address2] = await ethers.getSigners();
        const Collection: Collection__factory = await ethers.getContractFactory("Collection");
        collection = await Collection.deploy("TEST", "test1", 5, 5, address1.address, address2.address);
        await collection.deployed();
    });

    it("mint", async function () {
        const mintTx = await collection.mint(1);
    });

    it("update base uri", async function () {
        const mintTx = await collection.setBaseURI("test.com");

    });
});
