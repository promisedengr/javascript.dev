// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IChadinu.sol";

contract SugarHeadNFT is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant TOTAL_SUPPLY = 1500;
    uint256 public price;
    Phase public currentPhase;
    IChadInuVIPClub public ChadinuVip;
    IERC721 public DVDA;
    string public baseTokenURI;
    uint256[] public mintedIds;

    mapping(address => uint256[]) private tokenIdsOf;
    mapping(address => uint32) public freeMinters;
    mapping(address => bool) public isEarlyMinter;

    enum Phase {
        FREE_MINT,
        EARLY_MINT,
        PUBLIC_MINT
    }

    modifier onlyOneFree() {
        require(this.balanceOf(msg.sender) == 0, "Only one NFT is free");
        _;
    }

    modifier onlyValidAmount(uint32 _amount) {
        require(_amount <= 3 && _amount > 0, "Invalid amount");
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        address chadinu,
        address dvda,
        uint256 nftPrice
    ) ERC721(name, symbol) {
        price = nftPrice;
        ChadinuVip = IChadInuVIPClub(chadinu);
        DVDA = IERC721(dvda);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function addTokenIdTo(address _to, uint256 _tokenId) internal {
        tokenIdsOf[_to].push(_tokenId);
    }

    function removeTokenIdFrom(address _from, uint256 _tokenId) internal {
        uint256 tokenIndex;
        uint256[] memory _tokenIdsOf = tokenIdsOf[_from];
        for (uint32 i = 0; i < _tokenIdsOf.length; i++) {
            if (_tokenIdsOf[i] == _tokenId) {
                tokenIndex = i;
                break;
            }
        }
        uint256 lastTokenIndex = _tokenIdsOf.length - 1;
        uint256 lastToken = _tokenIdsOf[lastTokenIndex];

        tokenIdsOf[_from][tokenIndex] = lastToken;
        tokenIdsOf[_from][lastTokenIndex] = 0;

        tokenIdsOf[_from].pop();
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        require(_from != address(0));
        require(_to != address(0));
        super.transferFrom(_from, _to, _tokenId);
        removeTokenIdFrom(_from, _tokenId);
        addTokenIdTo(_to, _tokenId);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        // solium-disable-next-line arg-overflow
        safeTransferFrom(_from, _to, _tokenId, "");
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) public override {
        super.safeTransferFrom(_from, _to, _tokenId, _data);
        removeTokenIdFrom(_from, _tokenId);
        addTokenIdTo(_to, _tokenId);
    }

    receive() external payable {}

    function _mint(address to, uint256 id) internal override {
        // _safeMint(to, _tokenIds.current());
        _safeMint(to, id);
        // addTokenIdTo(msg.sender, _tokenIds.current());
        mintedIds.push(id);
        addTokenIdTo(msg.sender, id);
        _tokenIds.increment();
    }

    function buyNFTWithChadinu(uint256 id) external onlyOneFree {
        require(currentPhase == Phase.FREE_MINT, "No Free Sale");
        require(_tokenIds.current() + 1 <= TOTAL_SUPPLY, "No Enoguh NFTs");
        require(ChadinuVip.balanceOf(msg.sender) > 0, "No Chadinu VIP");

        _mint(msg.sender, id);
    }

    function buyNFTForFree(uint256[] memory ids) external {
        require(currentPhase == Phase.FREE_MINT, "No Free Sale");
        require(
            _tokenIds.current() + freeMinters[msg.sender] <= TOTAL_SUPPLY,
            "No Enoguh NFTs"
        );
        require(freeMinters[msg.sender] > 0, "Not Whitelisted");
        require(
            this.balanceOf(msg.sender) <=
                (ChadinuVip.balanceOf(msg.sender) > 0 ? 1 : 0),
            "Already minted free NFTs"
        );

        for (uint32 i = 0; i < freeMinters[msg.sender]; i++) {
            _mint(msg.sender, ids[i]);
        }
    }

    function buyNFTEarly(uint32 _amount, uint256[] memory ids)
        external
        payable
        onlyValidAmount(_amount)
    {
        require(currentPhase == Phase.EARLY_MINT, "No Early Sale");
        require(_amount * price == msg.value, "Insufficent Fund");
        require(
            _tokenIds.current() + _amount <= TOTAL_SUPPLY,
            "No Enoguh NFTs"
        );
        require(
            DVDA.balanceOf(msg.sender) > 0 || isEarlyMinter[msg.sender],
            "Not Whitelisted"
        );

        for (uint32 i = 0; i < _amount; i++) {
            _mint(msg.sender, ids[i]);
        }
    }

    function buyNFTsInPublic(uint32 _amount, uint256[] memory ids)
        external
        payable
        onlyValidAmount(_amount)
    {
        require(currentPhase == Phase.PUBLIC_MINT, "No Public Sale");
        require(_amount * price == msg.value, "Insufficent Fund");
        require(
            _tokenIds.current() + _amount <= TOTAL_SUPPLY,
            "No Enoguh NFTs"
        );
        for (uint32 i = 0; i < _amount; i++) {
            _mint(msg.sender, ids[i]);
        }
    }

    function getMintedIds() external view returns (uint256[] memory) {
        return mintedIds;
    }

    function getTokenIdsOf(address owner)
        external
        view
        returns (uint256[] memory)
    {
        return tokenIdsOf[owner];
    }

    function getTotalSupply() external pure returns (uint256) {
        return TOTAL_SUPPLY;
    }

    function getCurrentTokenId() external view returns (uint256) {
        return _tokenIds.current();
    }

    function getFreeMintNumber(address account) external view returns (uint32) {
        return freeMinters[account];
    }

    function addFreeMinters(
        address[] calldata _minters,
        uint32[] calldata _amounts
    ) external onlyOwner {
        require(_minters.length == _amounts.length, "Invalid Inputs");
        for (uint256 i = 0; i < _minters.length; i++) {
            freeMinters[_minters[i]] = _amounts[i];
        }
    }

    function addEarlyMinters(address[] calldata _minters, bool _flag)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _minters.length; i++) {
            isEarlyMinter[_minters[i]] = _flag;
        }
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function setPhase(uint32 _phase) external onlyOwner {
        if (_phase == 0) currentPhase = Phase.FREE_MINT;
        else if (_phase == 1) currentPhase = Phase.EARLY_MINT;
        else if (_phase == 2) currentPhase = Phase.PUBLIC_MINT;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        baseTokenURI = baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return
            string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId)));
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) external view returns (
        address receiver,
        uint256 royaltyAmount
    ) {
        receiver = owner();
        royaltyAmount = _salePrice / 10;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
