var DappToken = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");
var initialSupply = 1000000;

module.exports = function(deployer) {
  deployer.deploy(DappToken,initialSupply)
   .then(function(){
     // once the DappToken Contract is deployed,
     // Deploy the DappTokenSale Contract with arguments of
     // the DappToken Address

     // token price   in wei (.001 Ether)
    var tokenPrice = 1000000000000000 ; 

     return deployer.deploy(DappTokenSale,
                            DappToken.address,
                            tokenPrice); 
   });

  };
