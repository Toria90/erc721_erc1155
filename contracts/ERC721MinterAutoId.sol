pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ERC721MinterAutoId is ERC721, AccessControl {
    uint256 private _nextTokenId;
    string private _baseTokenUri;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name, string memory symbol, string memory baseTokenUri) ERC721(name, symbol){
        _baseTokenUri = baseTokenUri;

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());

        _mintTo(_msgSender());
    }

    function lastTokenId() public view returns (uint256){
        return _nextTokenId - 1;
    }

    function mint(address to) public onlyRole(MINTER_ROLE) {
        _mintTo(to);
    }

    function _mintTo(address to) private {
        _mint(to, _nextTokenId);
        _nextTokenId ++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _baseTokenUri;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool){
        return super.supportsInterface(interfaceId);
    }
}
