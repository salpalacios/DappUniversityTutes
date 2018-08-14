
pragma solidity ^0.4.2;

/** 
  ERC20 TOKEN
 */


import "./Console.sol";

contract DappToken{
     
    // Event Transfer :
    // MUST trigger when tokens are transferred, including zero value transfers.
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
     
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 indexed _value
    );

    // ERC20 - Returns the account balance of another account with address _owner.
    mapping(address => uint256) public balanceOf;
    // ER20 allowance (nested mapping)
    mapping(address=>mapping(address=> uint256)) public allowance;

    // Create token name , Public state variable gets writtent to blockchain
    string public name     = "DappToken";
    string public symbol   = "DAPP";
    string public standard = "Dapp Token v.1.0";
    uint256 public totalSupply;
    
    // constructor
    // Set the tokens and total supply upon instantiation
    constructor(uint256 _initialSupply)  public {
        // Balance of Admin (msg.sender is first account in Ganache)
        // msg is built in object that stores globals sent to contract
        balanceOf[msg.sender] = _initialSupply;
        //allocate the initial supply
        totalSupply = _initialSupply;
   
    }

    // Transfer Function
    function transfer(address _to, uint256 _value) public returns (bool success){
        
        // throws Exception if sender account doesnt have enough tokens
        // Notice msg.sender is built global object to get sender info
         
        require(balanceOf[msg.sender] >= _value);
         
        // Transer balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // Transfer Event
        emit Transfer(msg.sender,_to,_value);

        // Return boolean
        return true;

    }
     
    // Delegate Transfer (transferFrom)
    // An  account  is allowed   send tokens on our behalk to anouther account
    //  ex. account.A approves of account.B  to spend C.tokens on behalf of account.A
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        
        // Require _from has enough tokens
        require(_value <= balanceOf[_from]);
       
       // require _allowence is big enough
        require(_value <= allowance[_from][msg.sender] );
        
        // Change Balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        // Update the allowance
        allowance[_from][msg.sender] -= _value;

        // Transfer Event
        emit Transfer(_from,_to,_value);
        // Returns boolean
        return true;
    }
     
    // Approve Function (for delegate Transfers)
    //  msg.sender approves   _spender to spend _value     
    function approve(address _spender, uint256 _value) public returns (bool success){
     
        // sets the allowance (see mapping above)
        allowance[msg.sender][_spender] = _value;

        // Emit Approval Event
        emit Approval(msg.sender, _spender, _value);
         
        return true;
    }

} 