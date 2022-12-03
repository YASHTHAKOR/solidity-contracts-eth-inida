import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Collection Factory', function () {
    let cf:any;
    let address1: any, address2: any, address3: any;
    before(async () =>  {
        [address1, address2, address3] = await ethers.getSigners()
    })
    it('should deploy Contract', async ()  => {
        const CF = await ethers.getContractFactory('CollectionFactory');
        cf = await CF.deploy();
        await cf.deployed();
    });
});
