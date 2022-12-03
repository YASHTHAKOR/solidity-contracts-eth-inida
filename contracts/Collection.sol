pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import './Error.sol';

contract Collection is ERC721 {

    uint256 M;
    uint256 N;
    address Owner;
    address Parent;
    bool minted;

    mapping(uint256 => bool) minted;

    modifier onlyOwner() {
        if (msg.sender != Owner) revert Unauthorized();
        _;
    }

    modifier isNotLocked() {
        if (minted) revert NotAllowed();
        _;
    }

    constructor (uint256 _m, uint256 _n, address _owner, address _parent) {
        M = _m;
        N = _n;
        Owner = _owner;
        Parent = _parent;
    }

    function mint(uint256 tokenId, uint256 ) external onlyOwner isNotLocked  {
        require(m * N < tokenId, "Invalid token");
        _mint(tokenId, msg.sender, "0x000");
    }



}