pragma solidity ^0.4.2;

contract DappToken{
     
    // constructor

    //  Public state variable gets writtent to blockchain
    uint256 public totalSupply;
    // total Supply Mapping
    mapping(address => uint256) public balanceOf;

    // Create token name
    string public name = "DappToken";

    // Create token symbol
    string public symbol = "DAPP";

    // Create token symbol
    string public standard = "Dapp Token v.1.0";


    constructor(uint256 _initialSupply)  public {
        // Balance of Admin (msg.sender is first account in Ganache)
        // msg is built in object that stores globals sent to contrac t
        balanceOf[msg.sender] = _initialSupply;
       
        totalSupply = _initialSupply;
        //allocate the initial supply
    }

    
    // Set the tokens

    // Rea the toal number of token
}