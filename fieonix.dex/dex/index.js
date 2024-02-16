const fs = require('fs');
let rawdata = fs.readFileSync('build/contracts/SendEther.json',);
let contract_abi = JSON.parse(rawdata);
var Contract = require('web3-eth-contract');
Contract.setProvider('ws://localhost:7545');
var SendEther = new Contract(contract_abi.abi, '0xAb9a7647f6f266C8dD77c41C1faaa0c4ce489B12');

// const Web3 = require('web3')
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

// var alice = web3.eth.accounts.privateKeyToAccount('0xcdd4c30a8256d856145c55ff023583473aed0c0afa04477730c34ef053fe2423');
// var bob = web3.eth.accounts.privateKeyToAccount('0x632cc841b7f84cb2e1a99ca1641b974ca09ae33589cf84c4c193109a6274afdf');

SendEther.methods.Trans("0x504d21111AF77a256E5b94C12b93367FE0a8a335")
.send({ from: "0xFd0357940D3321CEa1402a2a9DD101Ec179d71Fe", value:1_0000_0000_0000_0000_000, gas:50000 })
.on("receipt", function(receipt) {
    console.log("Successfully sended!");
})
.on("error", function(error) {
    console.log(error);
});
