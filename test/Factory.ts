import {expect} from 'chai';
import {ethers} from 'hardhat';
import {Contract, Signer} from 'ethers';

import {abi as CollectionABI} from '../artifacts/contracts/Collection.sol/Collection.json'

import {CollectionFactory, CollectionFactory__factory} from '../typechain-types'

describe('Collection Factory', function () {
    let cf: CollectionFactory;
    let address1: Signer, address2: Signer, address3: Signer;
    let collections: string[] = [];
    const setup = async () => {
        const CF: CollectionFactory__factory = await ethers.getContractFactory('CollectionFactory');
        cf = await CF.deploy();
        await cf.deployed();
        [address1, address2, address3] = await ethers.getSigners();
    }
    beforeEach(setup)
    it('should deploy Contract', async () => {
        expect(cf.address).not.eq(undefined, 'CollectionFactor Contract is not deployed');
    });

    it('can create collection', async () => {
        const createCollectionTX = await cf.connect(address1).createCollection('Collection1', 'COL-1', 1, 2);
        const createCollectionReceipt = await createCollectionTX.wait();

        const collectionAddress = ((createCollectionReceipt.events || []).find((e) => e.event === 'CollectionCreated') || {args: {Collection: null}}).args?.Collection;

        expect(typeof collectionAddress).to.be.eq('string', 'created collection is not present');

        collections.push(collectionAddress);
    });

    it('can not fork if minting is not completed', async () => {
        const forkedCollection = await cf.connect(address1).forkCollection('Collection2', 'COL-2', collections[0])
            .catch(e => e);

        expect((JSON.stringify(forkedCollection) || '').includes('Not allowed')).to.be.eq(true, 'can not fork if not minted condition failed');
    });

    it('can clone collection', async () => {
        try {
            const parentCollection: Contract = new ethers.Contract(collections[0], CollectionABI);
            const mint1Tx = await parentCollection.connect(address1).mint(0);
            mint1Tx.wait();
            const mint2Tx = await parentCollection.connect(address1).mint(1);
            mint2Tx.wait();
            const readyToForkTX = await parentCollection.connect(address1).complete();
            await readyToForkTX.wait();
            const forkCollectionTX = await cf.connect(address2).forkCollection('Collection2', 'COL-2', collections[0]);
            const forkCollectionReceipt = await forkCollectionTX.wait();

            const forkedCollectionAddress = ((forkCollectionReceipt.events || []).find((e) => e.event === 'CollectionForked') || {args: {Collection: null}}).args?.Collection;

            expect(typeof forkedCollectionAddress).to.be.eq('string', 'created collection is not present');

            const forkedContract: Contract = new ethers.Contract(forkedCollectionAddress, CollectionABI);

            const parent = await forkedContract.connect(address2).Parent();

            expect(parent).to.be.eq(collections[0], 'created collection is not present');
            collections.push(forkedCollectionAddress);
        } catch (e) {
            console.log('error in can fork: ', JSON.stringify(e, null, 4));
        }
    });
});


