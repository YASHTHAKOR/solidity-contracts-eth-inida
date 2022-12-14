pragma solidity ^0.8.17;
import './Collection.sol';

contract CollectionFactory {
    mapping(address => address[]) public userCollections;
    address[] public collections;
    address[] public forks;

    event CollectionCreated(address Collection, string _collectionName, address Owner);
    event CollectionForked(address Collection, string _collectionName, address Owner, address parent);

    constructor () {
    }

    function userCollectionCount(address user) public view returns (uint) {
        return userCollections[user].length;
    }

    function getUserCollections(address user) public view returns (address[] memory) {
        return userCollections[user];
    }

    function _cloneCollection(string memory _collectionName, string memory _sym, uint _m, uint _n, address owner, address parent) internal returns (address) {
        Collection newCollection = new Collection(_collectionName, _sym, _m, _n, owner, parent);
        userCollections[owner].push(address(newCollection));
        return address(newCollection);
    }

    function createCollection(string memory _collectionName, string memory _sym, uint _m, uint _n) external returns (address) {
        address createdCollection = _cloneCollection(_collectionName, _sym, _m, _n, msg.sender, address(0));
        collections.push(createdCollection);
        emit CollectionCreated(createdCollection, _collectionName, msg.sender);
        return createdCollection;
    }

    function forkCollection(string memory _collectionName, string memory _sym, address parent) external returns (address) {
        require(Collection(parent).minted(), 'Not allowed');

        uint _m = Collection(parent).M();
        uint _n = Collection(parent).N();
        address forkedCollection = _cloneCollection(_collectionName, _sym, _m, _n, msg.sender, parent);
        forks.push(forkedCollection);
        emit CollectionForked(forkedCollection, _collectionName, msg.sender, parent);
        return forkedCollection;
    }
}
