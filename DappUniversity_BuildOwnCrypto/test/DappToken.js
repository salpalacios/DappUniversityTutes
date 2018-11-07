var DappToken = artifacts.require("./DappToken.sol")

contract("DappToken", function(accounts){  

    it('Initializes the contract with correct value (version 1)',function(){
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

    // Writing the same as above but using aync/await  sync
    it('Initializes the contract with correct value (version 2)',async ()=>{
         let tokenInstance = await DappToken.deployed();
         let tokenName     = await tokenInstance.name();
         let tokenStandard = await tokenInstance.standard();
         let tokenSymbol   = await tokenInstance.symbol();

         assert.equal(tokenName,'DappToken','Token has a name') ;
         assert.equal(tokenSymbol,'DAPP','Token has a symboo') ;
         assert.equal(tokenStandard,'Dapp Token v.1.0');
    })

    it('Sets the total supply on deployment (version1)',function(){ 

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

    // Writing the same as above but using aync/await  sync
    it('Sets the total supply on deployment (version2)', async ()=>{  
        const InitBalance = 1000000; 
         
        let tokenInstance = await DappToken.deployed();
        let totalSupply   = await tokenInstance.totalSupply();
        let adminBalance  = await tokenInstance.balanceOf(accounts[0]);
 
        // Ganache uses first account accont[0] as admin account
        assert.equal( totalSupply.toNumber(), InitBalance,'Test total supply to 1,000,000');
        assert.equal(adminBalance.toNumber(),InitBalance, 'it allocates the initial supply');
    })

    it('Tranfers token ownership',function(){ 
        return DappToken.deployed() 

            .then(function(instance){ 
                tokenInstance = instance;
                // try to tranfer a ridiculously high amount
                //  NOTE that using call() doesnt create a transaction, 
                //  allowing to just call the (the return value is not a transaction receipt)
                // function
                return tokenInstance.transfer.call(accounts[1],9999999999999999999); 
            })

            .then(assert.fail).catch( function(err){
                //console.log(err.message);
                assert(err.message.indexOf('revert') >= 0 ,'error messwage must contain revert');
                return (tokenInstance.transfer(accounts[1],250000, {from: accounts[0]}) )
            })

            .then(function(receipt){
                const EventLog = receipt.logs[0];
                
                assert.equal(receipt.logs.length,1,'triggers one event');
                assert.equal(EventLog.event,'Transfer','Should be the transfer event');
                assert.equal(EventLog.args._from,accounts[0],'logs the account transfered from');
                assert.equal(EventLog.args._to,accounts[1],'logs the account transfer to');
                assert.equal(EventLog.args._value,250000,'triggers one event');

                return tokenInstance.balanceOf(accounts[1]);
            })
 
            .then(function(NewBalanceReciever){
                assert.equal(NewBalanceReciever.toNumber(), 250000,"adds the amount to receiver");
                return tokenInstance.balanceOf(accounts[0]);
            })

            .then(function(NewBalanceOfOriginal){
                 assert.equal(NewBalanceOfOriginal.toNumber(),750000,"deducts the amount form sending account")
            })
    })

    it('Approves tokens for delegate transfer',function(){
        return DappToken.deployed()
        .then(function(instance){
            tokenInstance = instance; 
            return tokenInstance.approve.call( accounts[1],100,{from:accounts[0]} )
        })
        .then((success)=>{
            assert.equal(success,true,'it returns true');
            // account 0 approves of account 1 to spend 100 on their behalf
            return tokenInstance.approve(accounts[1],100,{from:accounts[0]});
        }) 
        .then(function(receipt){ 
            const EventLog = receipt.logs[0]; 
            assert.equal(receipt.logs.length,1,'triggers one event');
            assert.equal(receipt.logs[0].event,'Approval','Should be the "approval" event');
            assert.equal(receipt.logs[0].args._owner,accounts[0],'logs the account tokens are authorized by');
            assert.equal(receipt.logs[0].args._spender,accounts[1],'logs the account tokens are authorized to');
            assert.equal(receipt.logs[0].args._value,100,'logs the transfer ammound');
            
            return tokenInstance.allowance(accounts[0], accounts[1]); 
        })  
        .then(function(allowance){
            assert.equal(allowance.toNumber(),100,'stores the allowance for delagate transfer')
        })
    }) 
    
    
    it('Handles delegate token transfer',function(){
        return DappToken.deployed().then(function(instance){ 
             tokenInstance   = instance;
             fromAccount     = accounts[2];
             toAccount       = accounts[3];
             spendingAccount = accounts[4];
            // Transfer some tokens to fromAcccount so we have enough to test 
            return tokenInstance.transfer(fromAccount,100,{from:accounts[0]});

        }).then (function(receipt){
            // Approve spendingAccou to spend 10 tokens from fromAccount
            return tokenInstance.approve(spendingAccount, 10, {from: fromAccount})

        }).then(function(receipt){
            // Try transferring something larger than whats in the senders balance
                return tokenInstance.transferFrom(fromAccount, toAccount, 9999, {from: spendingAccount}) 
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0,"cannot transfer value larger than balance");
            //Try sending someing larger than approve ammount
             return tokenInstance.transferFrom(fromAccount, toAccount, 20, {from :spendingAccount})
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0,"cannot transfer value larger than approve amount");
            // note this call doesnt record as an actuall transaction
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount});
        }).then(function(success){
            assert.equal(success,true,"it should returns true");
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount}); 
        }).then(function(receipt){
            const EventLog = receipt.logs[0]; 
            assert.equal(receipt.logs.length,1,'triggers one event');
            assert.equal(EventLog.event,'Transfer','Should be the "approval" event');
            assert.equal(EventLog.args._from,fromAccount,'logs the account the tokens are tranfered from');
            assert.equal(EventLog.args._to,toAccount,'logs the account the tokes are authorized to');
            assert.equal(EventLog.args._value,10,'logs the transfer ammount');
            return tokenInstance.balanceOf(fromAccount);
        }).then(function(balance){ 
            assert.equal(balance.toNumber(),90, 'deducts the amount 10 to the sending account');
            return tokenInstance.balanceOf(toAccount);
        }).then(function(balance){
            assert.equal(balance.toNumber(),10,"adds the amount 10 from the sending account")
            return tokenInstance.allowance(fromAccount,spendingAccount);
        }).then(function(allowance){
            assert.equal(allowance.toNumber(),0,"deducts amount from  the allowance");
        })

    })
})