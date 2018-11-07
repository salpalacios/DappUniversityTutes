var DappTokenSale = artifacts.require("./DappTokenSale.sol");

contract('DappTokenSale',function(accounts){

    var tokenSaleInstance;

    var tokenPrice = 1000000000000000 ;  // token price   in wei (.001 Ether)

    var buyer = accounts[1];

    var numberOfTokens;

    it('init contract with the correct values',function(){

        return DappTokenSale.deployed()
        
        .then(function(instance){
            tokenSaleInstance = instance; 
            return tokenSaleInstance.address;
        })

        .then(function(address){
            assert.notEqual(address,0x0,'has contract address');
            return tokenSaleInstance.tokenContract();
        })

        .then(function(address){
            assert.notEqual(address,0x0,'has token contract address');
            return tokenSaleInstance.tokenPrice();
        })

        .then (function(price){
            assert.equal(price,tokenPrice,'token price is correct')
        }) 
    });

    it('facilitiates token buying',function(){
        return DappTokenSale.deployed()

        .then(function(instance){
            tokenSaleInstance  = instance;
            
            numberOfTokens = 10;
 
            return tokenSaleInstance.buyTokens(numberOfTokens, {from :buyer, value:numberOfTokens * tokenPrice})

        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,'triggers one event');
            assert.equal(receipt.logs[0].event,"Sell", 'should be the "SELL" even');
            assert.equalt(receipt.logs[0].args._buyer,buyer, "logs the accouts that purchesed the tokens");
            assert.equalt(receipt.logs[0].args._amount,numberOfTokens,'logs the number of tokens purchased');

            return tokenSaleInstance.tokenSold(); 

        }).then(function(amount){
            assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold')
        })
        
    })

})

