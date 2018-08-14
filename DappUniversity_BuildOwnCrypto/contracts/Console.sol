pragma solidity ^0.4.10;

// Enables event logging of the format `console.log('descriptive string', variable)`, 
// without having to worry about the variable type (as long as an event has been declared for that type in the 
// Console contract.

contract Console{
    event LogUint(string, uint);
    
    function log(string s, uint x) public {
        emit LogUint(s, x);
    }
    
    event LogInt(string, int);
    function log(string s, int x) public {
        emit LogInt(s, x);
    }
    
    event LogBytes(string, bytes);
    function log(string s, bytes x) public {
        emit LogBytes(s, x);
    }
    
    event LogBytes32(string, bytes32);
    function log(string s, bytes32 x)public{
        emit LogBytes32(s, x);
    }

    event LogAddress(string, address);
    function log(string s, address x) public {
        emit LogAddress(s, x);
    }

    event LogBool(string, bool);
    function log(string s, bool x)public {
        emit LogBool(s, x);
    }
}

contract NeedsDebugging is Console {
    
    function InspectMePlease() public{
        log("name", uint(1));
    }
}