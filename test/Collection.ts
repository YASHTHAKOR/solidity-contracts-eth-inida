import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mint token", function () {
    let collection:any;
    it("should deploy Contract", async function () {
        const [address1, address2] = await ethers.getSigners();
        const Collection = await ethers.getContractFactory("Collection");
        collection = await Collection.deploy("TEST", "test1", 5, 5, address1.address, address2.address);
        await collection.deployed();
    });



    it("mint", async function () {
        const mintTx = await collection.mint(1);
    });
});