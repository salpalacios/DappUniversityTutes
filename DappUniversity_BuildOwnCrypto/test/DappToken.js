var DappToken = artifacts.require("./DappToken.sol")

contract("DappToken", function(accounts){ 
    it('Initializes the contract with correct value',function(){
      return DappToken.deployed()

              .then(function(instance){
                tokenInstance = instance; 
                return tokenInstance.name();
              })

              .then(function(name){
                assert.equal(name,'DappToken','Token has a name') ;
                return tokenInstance.symbol();
              })

              .then(function(symbol){
                assert.equal(symbol,'DAPP','Token has a symboo') ;
                 return tokenInstance.standard();
              }) 

              .then(function(standard){
                 assert.equal(standard,'Dapp Token v.1.0')
                
              })

    })

    it('Sets the total supply on deployment',function(){ 

      const InitBalance = 1000000; 
      return DappToken.deployed()
                .then(function(instance)
                { 
                    tokenInstance = instance;
                    return tokenInstance.totalSupply();
                }) 
                .then(function (totalSupply)
                {
                    // Ganache uses first account accont[0] as admin account
                    assert.equal( totalSupply.toNumber(), InitBalance,'Test total supply to 1,000,000');
                    return tokenInstance.balanceOf(accounts[0]);
                }) 
                .then (function(adminBalance){
                    assert.equal(adminBalance.toNumber(),InitBalance, 'it allocates the initial supply');
                })
    }) 
})