import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from "ethers";

import { CollectionFactory, CollectionFactory__factory } from '../typechain-types'

describe('Collection Factory', function () {
    let cf: CollectionFactory;
    let address1: Signer, address2: Signer, address3: Signer;
    let collections: string[] = [];
    const setup = async () =>  {
        const CF: CollectionFactory__factory = await ethers.getContractFactory('CollectionFactory');
        cf = await CF.deploy();
        await cf.deployed();
        [address1, address2, address3] = await ethers.getSigners()
    }
    beforeEach(setup)
    it('should deploy Contract', async ()  => {
        const CF: CollectionFactory__factory = await ethers.getContractFactory('CollectionFactory');
        cf = await CF.deploy();
        await cf.deployed();
    });

    it.only('can create collection', async () => {
       const createCollectionTX = await cf.connect(address1).createCollection('Collection1', 'COL-1', 2, 2);
       const createCollectionReceipt = await createCollectionTX.wait();

       console.log('collection receipt: ', JSON.stringify(createCollectionReceipt));
    });

    it.only('can clone collection', async () => {
       const createCollectionTX = await cf.connect(address1).createCollection('Collection1', 'COL-1', 2, 2);
       const createCollectionReceipt = await createCollectionTX.wait();

       console.log('collection receipt: ', JSON.stringify(createCollectionReceipt));
    });
});


