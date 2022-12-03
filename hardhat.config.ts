import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    polygon: {
      url: process.env.POLYGON_URL || "",
      accounts: [process.env.POLYGON_KEY],
      blockGasLimit: 12450000000 // whatever you want here
    },
    bsc: {
      url: process.env.BSC_URL || "",
      accounts: [process.env.BSC_KEY]
    }
  }
};

export default config;
