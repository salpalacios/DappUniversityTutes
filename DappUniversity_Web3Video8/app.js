

// Web3
const Web3 = require('web3')

// Infurate Ethereum RPC URL to main net (ethereum,)
const url ="https://mainnet.infura.io/yUSPaLOD3DotSOmfoDu"

// Instantiate a connection to the main ethereum chain
var web3 = new Web3 (url);

 // Get average Gas Price on *for the Network
 /*
 web3 .eth.getGasPrice().then((result)=>{
   const returnData = web3.utils.fromWei(result,'ether')
   console.log("Gas Price in Wei:", returnData)
 })
 */


// Hashing Function(s)
var result = web3.utils.sha3("Dapp University");
 
// Keccak256
   result = web3.utils.keccak256("Dapp University");
 


// Solidity sha3 hashing function 
 result = web3.utils.soliditySha3("Dapp University");


// Hashing Function(s)
var result = web3.utils.randomHex(32);
 

console.log("randoHex:",web3.utils._)

