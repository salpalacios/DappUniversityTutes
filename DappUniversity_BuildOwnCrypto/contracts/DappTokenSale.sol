pragma solidity   ^0.4.2;

/**

  How it works:

  -- Provisions tokens  for token sale contract
  -- Set a token price in wei
  -- Assign an Admin
  -- Buy Tokens
  -- End Sale

 */


import "./DappToken.sol";

contract DappTokenSale {
    address admin;

    DappToken public tokenContract;

    uint256 public tokenPrice;

    uint256 public tokenSold;

    event Sell(address _buyer,uint256 _amount);


    constructor (DappToken _tokenContract, uint256 _tokenPrice) public {
       
        // Assign an Admin (account)    
        admin = msg.sender;

        // Token Contract
        tokenContract = _tokenContract;
         
        // Set Token Price
        tokenPrice = _tokenPrice;

    }

// Buy Tokens:

// making a function capable of sending ether must be made of type payable

    function buyTokens(uint256 _numberOfTokens) public payable{
     // Require that value is equal to tokens
     // Requir that the contract has enough tokens
     // Require the transfer is successful
   
     // Keep track of number of tokesn sold
        tokenSold += _numberOfTokens;

     // emit Sell Event
        emit Sell(msg.sender,_numberOfTokens);

    }

// End Sale

}