
Part1

Tutorial is here:
================

Practical steps for go-ethereum setup by Aung Maw

https://www.youtube.com/watch?v=t3wM5903ty0&t=1180s



Dependancies needed  
---------------------------------------------------------------

will use node console and web3 library, the tutorial uses unfura.com, 
instead going to use private network in our computer located 
here (~/Library/_Ethereum-Private2)

  >npm install web3@0.20.2 

Running the node (two options):
---------------------------------------
 _Ethereum-Private2 
 
    >runThisNode.sh
 
 in anouther tab run attach via RPC

 >  $geth attach http://127.0.0.1:8546 --preload "minePendingOnly.js"