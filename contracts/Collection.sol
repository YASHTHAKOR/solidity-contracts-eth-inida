pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import './Error.sol';

contract Collection is ERC721 {

    uint256 M;
    uint256 N;
    address Owner;

    mapping(uint256 => bool) minted;

    modifier onlyOwner() {
        if (msg.sender != Owner) revert Unauthorized();
        _;
    }

    constructor (uint256 _m, uint256 _n, address _owner) {
        M = _m;
        N = _n;
        Owner = _owner;
    }


}