var DappToken = artifacts.require("./DappToken.sol")

contract("Dapptoken", function(accounts){

   it('sets the total supply on deployment')
   {
    return DappToken.deployed()
            .then(function(instance){
                var tokenInstance = instance;
                return tokenInstance.totalSupply();
            })
            .then(function(totalSupply){
                assert.equal(totalSupply.toNumber(),1000000,'Test total supply to 1,000,000');
            })
       
   };
})