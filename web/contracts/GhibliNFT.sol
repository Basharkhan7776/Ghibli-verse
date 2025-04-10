// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GhibliNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) private _creators;
    
    // Mapping from token ID to royalty percentage (in basis points, e.g., 500 = 5%)
    mapping(uint256 => uint256) private _royalties;
    
    // Marketplace functionality
    struct Listing {
        bool isForSale;
        uint256 price;
        address seller;
    }
    
    struct Auction {
        bool isActive;
        uint256 startingPrice;
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        address seller;
    }
    
    // Mapping from token ID to listing details
    mapping(uint256 => Listing) private _listings;
    
    // Mapping from token ID to auction details
    mapping(uint256 => Auction) private _auctions;
    
    // Events
    event NFTMinted(uint256 tokenId, address creator, string tokenURI);
    event NFTListed(uint256 tokenId, uint256 price, address seller);
    event NFTSold(uint256 tokenId, uint256 price, address seller, address buyer);
    event AuctionCreated(uint256 tokenId, uint256 startingPrice, uint256 endTime, address seller);
    event BidPlaced(uint256 tokenId, address bidder, uint256 amount);
    event AuctionEnded(uint256 tokenId, address winner, uint256 amount);
    
    constructor() ERC721("GhibliNFT", "GHIBLI") {}
    
    // Mint a new NFT
    function mintNFT(address recipient, string memory tokenURI, uint256 royaltyPercentage) 
        public 
        returns (uint256) 
    {
        require(royaltyPercentage <= 1500, "Royalty percentage cannot exceed 15%");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        _creators[newItemId] = msg.sender;
        _royalties[newItemId] = royaltyPercentage;
        
        emit NFTMinted(newItemId, msg.sender, tokenURI);
        
        return newItemId;
    }
    
    // List an NFT for sale
    function listNFT(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can list the NFT");
        require(!_auctions[tokenId].isActive, "NFT is currently in an auction");
        
        _listings[tokenId] = Listing(true, price, msg.sender);
        
        emit NFTListed(tokenId, price, msg.sender);
    }
    
    // Buy a listed NFT
    function buyNFT(uint256 tokenId) public payable {
        Listing memory listing = _listings[tokenId];
        require(listing.isForSale, "NFT is not for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        
        address seller = listing.seller;
        uint256 price = listing.price;
        
        // Calculate royalty if applicable
        uint256 royaltyAmount = 0;
        if (_creators[tokenId] != seller) {
            royaltyAmount = (price * _royalties[tokenId]) / 10000;
            payable(_creators[tokenId]).transfer(royaltyAmount);
        }
        
        // Transfer remaining amount to seller
        payable(seller).transfer(price - royaltyAmount);
        
        // Transfer NFT to buyer
        _transfer(seller, msg.sender, tokenId);
        
        // Remove listing
        delete _listings[tokenId];
        
        emit NFTSold(tokenId, price, seller, msg.sender);
    }
    
    // Create an auction for an NFT
    function createAuction(uint256 tokenId, uint256 startingPrice, uint256 duration) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can auction the NFT");
        require(!_listings[tokenId].isForSale, "NFT is currently listed for sale");
        
        uint256 endTime = block.timestamp + duration;
        
        _auctions[tokenId] = Auction(true, startingPrice, endTime, address(0), 0, msg.sender);
        
        emit AuctionCreated(tokenId, startingPrice, endTime, msg.sender);
    }
    
    // Place a bid on an auction
    function placeBid(uint256 tokenId) public payable {
        Auction storage auction = _auctions[tokenId];
        require(auction.isActive, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(msg.value > auction.highestBid, "Bid must be higher than current highest bid");
        require(msg.value >= auction.startingPrice, "Bid must be at least the starting price");
        
        // Return previous highest bid if there was one
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }
        
        // Update highest bid
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        
        emit BidPlaced(tokenId, msg.sender, msg.value);
    }
    
    // End an auction
    function endAuction(uint256 tokenId) public {
        Auction storage auction = _auctions[tokenId];
        require(auction.isActive, "Auction is not active");
        require(block.timestamp >= auction.endTime, "Auction has not ended yet");
        
        auction.isActive = false;
        
        // If there were no bids, do nothing
        if (auction.highestBidder == address(0)) {
            emit AuctionEnded(tokenId, address(0), 0);
            return;
        }
        
        address seller = auction.seller;
        uint256 amount = auction.highestBid;
        
        // Calculate royalty if applicable
        uint256 royaltyAmount = 0;
        if (_creators[tokenId] != seller) {
            royaltyAmount = (amount * _royalties[tokenId]) / 10000;
            payable(_creators[tokenId]).transfer(royaltyAmount);
        }
        
        // Transfer remaining amount to seller
        payable(seller).transfer(amount - royaltyAmount);
        
        // Transfer NFT to highest bidder
        _transfer(seller, auction.highestBidder, tokenId);
        
        emit AuctionEnded(tokenId, auction.highestBidder, amount);
    }
    
    // Get creator of an NFT
    function getCreator(uint256 tokenId) public view returns (address) {
        return _creators[tokenId];
    }
    
    // Get royalty percentage for an NFT
    function getRoyaltyPercentage(uint256 tokenId) public view returns (uint256) {
        return _royalties[tokenId];
    }
    
    // Get listing details for an NFT
    function getListing(uint256 tokenId) public view returns (bool, uint256, address) {
        Listing memory listing = _listings[tokenId];
        return (listing.isForSale, listing.price, listing.seller);
    }
    
    // Get auction details for an NFT
    function getAuction(uint256 tokenId) public view returns (
        bool, 
        uint256, 
        uint256, 
        address, 
        uint256, 
        address
    ) {
        Auction memory auction = _auctions[tokenId];
        return (
            auction.isActive,
            auction.startingPrice,
            auction.endTime,
            auction.highestBidder,
            auction.highestBid,
            auction.seller
        );
    }
}
