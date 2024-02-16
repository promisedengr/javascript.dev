const axios = require('axios');                         //used for getting api data, install with "yarn add axios"
const { ethers } = require('ethers');   
const BigNumber = require('bignumber.js');
const genericErc20Abi = require('./erc20.json');

var config = require("./config.js")

const tokens = config.tokens
const decimals = config.decimals


const privateKey = config.privateKey
const rpcUrl = config.rpcUrl
const chainId = config.chainId

const MATICprovider = new ethers.providers.JsonRpcProvider(rpcUrl); 
const wallet = new ethers.Wallet(privateKey, MATICprovider);       //connect the matic provider along with using the private key as a signer


async function approveApiCaller(value, tokenAddress) {
    let url = 'https://api.1inch.exchange/v3.0/'+chainId+'/approve/calldata' +
        (value > -1 && value != null ? "?amount=" + value + "&" : "") 
        + "tokenAddress=" + tokenAddress 
    try {
        let temp = await axios.get(url)                //get the api call
        temp = temp.data;                               //we only want the data object from the api call
        //we need to convert the gasPrice to hex
        delete temp.gasPrice;
        delete temp.gas;                             //ethersjs will find the gasLimit for users
        //we also need value in the form of hex
        let val = parseInt(temp["value"]);			//get the value from the transaction
        val = '0x' + val.toString(16);				    //add a leading 0x after converting from decimal to hexadecimal
        temp["value"] = val;						    //set the value of value in the transaction object
        return temp                                 //return the data
    }
    catch(e) {
        console.log("ERROR:  there is no liquidity for this token");
        return null
    }
    
}

async function apiCaller(url, nonce) {
    let temp = await axios.get(url);                //get the api call
    temp = temp.data;                               //we only want the data object from the api call
    delete temp.tx.gasPrice;                        //ethersjs will find the gasPrice needed
    delete temp.tx.gas;                             //ethersjs will find the gasLimit for users

    //we also need value in the form of hex
    let value = parseInt(temp.tx["value"]);			//get the value from the transaction
    value = '0x' + value.toString(16);				//add a leading 0x after converting from decimal to hexadecimal
    temp.tx["value"] = value;						//set the value of value in the transaction object. value referrs to how many of the native token

    temp.tx["nonce"] = nonce;                     //ethersjs will find the nonce for the user
    //temp.tx.chainId = 137                         //this allows the transaction to NOT be replayed on other chains, ethersjs will find it for the user
    return temp;                                    //return the data
}

async function swap(fromToken, toToken, tradeAmount) {
    nonce = await wallet.getTransactionCount() + 1;
    let globalData = await approveApiCaller(tradeAmount, fromToken)
    if (globalData==null) return {success:false, reason: "You can't swap these tokens"}

    try {
        let data = await wallet.sendTransaction(globalData)
        console.log("Approval success. Hash: ", data.hash)
        
    } catch (e) {
        console.log("Approval failure");
    }
    nonce = await wallet.getTransactionCount() + 1;
    
    let callURL = 'https://api.1inch.exchange/v3.0/'+chainId+'/swap?fromTokenAddress='+fromToken+ '&' +
    'toTokenAddress='+ toToken + '&' +
    'amount=' + tradeAmount + '&fromAddress=' +
    wallet.address +
    '&slippage=1';
    
    var swapData = null;

    for (let i=0; i< 100; i++)
        try {
            swapData = await apiCaller(callURL, nonce); 
            i = 1000
        } catch(e) {

        }

    try {
        
        let data = await wallet.sendTransaction(swapData["tx"])
        console.log("Swap success between tokens")
        return data
    } catch (e) {
        console.log("Swap failure", e);
        return null
    }
}
function initialize() {
    for ( let tokenSymbol in tokens ) {
        config.tokens[tokenSymbol]['contract'] = new ethers.Contract(tokens[tokenSymbol]['address'], genericErc20Abi, MATICprovider);
    }
}

async function start() {
    for(let i=0; i<100; i++) {
        i = 0;
        for ( let fromTokenSymbol in tokens ) {
            for ( let toTokenSymbol in tokens ) {
                if ( fromTokenSymbol==toTokenSymbol ) continue;

                let fromToken = tokens[ fromTokenSymbol ];
                let toToken = tokens[ toTokenSymbol ];

                try {
                    let tradeAmount = new BigNumber(fromToken['betAmount']).shiftedBy(fromToken['decimals']).toFixed()
                    let url = `https://api.1inch.exchange/v3.0/`+chainId+`/quote?fromTokenAddress=${fromToken['address']}&toTokenAddress=${toToken['address']}&amount=${tradeAmount}`
                    let urlForBNB = `https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT`;

                    const fromTokenBalance = (await fromToken['contract'].balanceOf(wallet.address)) / decimals[ fromToken.decimals ];
                    const toTokenBalance = (await toToken['contract'].balanceOf(wallet.address)) / decimals[ fromToken.decimals ];
                    
                    const data = await axios.get( url )
                    const BNBPrice = await axios.get( urlForBNB )
                    let json = data.data

                    let mise     = json.fromTokenAmount / decimals[ json.fromToken.decimals ];
                    let expected = json.toTokenAmount / decimals[ json.toToken.decimals ];
                    let gas = BNBPrice.data['price'] * json.estimatedGas / decimals[ 9 ]
                    let benef    = ( ( expected - gas ) / mise - 1 ) * 100
                    let benef_nf = benef.toFixed(2);
                    
                    //swap tokens
                    if (benef_nf > config.acceptableProfit && fromTokenBalance > toTokenBalance) {
                        console.log('-----------------', "swap from ", fromTokenSymbol, 'to', toTokenSymbol, 'benifit precentage', benef_nf, 'bet amount', fromToken['betAmount'], new Date(), '-------------------------------')
                        try {
                            await swap(fromToken['address'], toToken['address'], tradeAmount)
                        }
                        catch {
                            console.log('There is an error. Swap again.')
                            await swap(fromToken['address'], toToken['address'], tradeAmount)
                        }
                    }
                    
                    // rebalancing
                    if (benef_nf >= 0 && benef_nf < 0.01) {
                        
                        if ( toTokenBalance < toToken['betAmount'] * 2 && fromTokenBalance > toTokenBalance) {
                            let amount = (fromTokenBalance + toTokenBalance) / 2 - fromTokenBalance;
                            console.log("Rebalancing", fromTokenSymbol, "to", toTokenSymbol, "amount: ", amount);
                            await swap(fromToken['address'], toToken['address'], tradeAmount);
                        } 
                    }

                } catch ( error ) {
                    console.log(error)
                    continue
                }

            }
        }
    }
}

initialize();
start();