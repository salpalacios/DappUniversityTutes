
// Examples Usin Web3 Library, launch in node console
// 
// Web3
const Web3 = require('web3')

// Infurate ethereum RPC URL to main net (ethereum,)
const url ="https://mainnet.infura.io/yUSPaLOD3DotSOmfoDu"

// Instantiate a connection to the main ethereum chain
var web3 = new Web3 (url);

//Get lateset or most recent block
//web3.eth.getBlockNumber().then(console.log);

// Get latest Transactions Block
//  web3.eth.getBlock('latest').then(console.log)
// use block number
//  web3.eth.getBlock(6005359).then(console.log)

// Using Block Hash
//  web3.eth.getBlock('0xaa267cac453e9f7a9b9d9f93cf7731f0033d1d766ccb54e09c94cf5af3e131db').then(console.log)
 
 
// Get latest Transaction
//  web3.eth.getBlock('latest').then( (block)=>{ console.log(block.transactions), "\n"});


// Get LATEST BLOCK
/*
 


// Get the latest 10 blocks
 web3.eth.getBlockNumber().then( (latest)=>{
    // decrement block number and get it
    for (let i = 0; i < 10; i++)
    {
        web3.eth.getBlock(latest -i).then( (block)=>{console.log(block.number)})
    }

} )
 
*/


// Get a particular transation in block
const blockHash = '0xaa267cac453e9f7a9b9d9f93cf7731f0033d1d766ccb54e09c94cf5af3e131db'

 web3.eth.getTransactionFromBlock(blockHash,2).then(console.log)
 
