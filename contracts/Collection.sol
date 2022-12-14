pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import './Errors.sol';

contract Collection is ERC721 {

    uint256 public M;
    uint256 public N;
    address public Owner;
    address public Parent;
    bool public minted;
    string public baseURI;

    using Strings for uint256;

    event Mint(uint256 tokenId);

    mapping(uint256 => bool) mintedIds;

    modifier onlyOwner() {
        if (msg.sender != Owner) revert Errors.Unauthorized();
        _;
    }

    modifier isNotLocked() {
        if (minted) revert Errors.NotAllowed();
        _;
    }

    constructor (string memory _name, string memory _symbol, uint256 _m, uint256 _n, address _owner, address _parent)  ERC721(_name, _symbol){
        M = _m;
        N = _n;
        Owner = _owner;
        Parent = _parent;
    }

    function mint(uint256 tokenId) external onlyOwner isNotLocked {
        require(M * N > tokenId, "Invalid token");
        require(!mintedIds[tokenId], "already minted");
        _mint(msg.sender, tokenId);
        mintedIds[tokenId] = true;
        emit Mint(tokenId);
    }

    function complete() external onlyOwner isNotLocked {
        minted = true;
    }

    function setBaseURI(string memory _baseURI) external onlyOwner {
        require(bytes(baseURI).length == 0, "uri already set");
        baseURI = _baseURI;
    }

    function getURL(uint256 tokenId) external view returns (string memory){
        if(mintedIds[tokenId]) {
            return string(abi.encodePacked(baseURI, tokenId.toString()));
        }
        return Collection(Parent).getURL(tokenId);
    }

}