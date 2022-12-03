import { ethers } from "hardhat";

async function main() {

  const CollectionFactory = await ethers.getContractFactory("CollectionFactory");
  const collectionFactory = await CollectionFactory.deploy();

  await collectionFactory.deployed();

  console.log(collectionFactory.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
