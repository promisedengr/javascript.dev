# Copy Trading bot
Wallet tracked bot is a bot which it can do type of market manipulation where an entity can enter into a transaction in advance of a pending or incoming order from the specific wallets that will or may impact the price of the order.

## IMPORTANT NOTES BEFORE RUNNING THE BOT !!!

1) The bot uses a wallet address and private key
    - if this is **NOT** configured correctly you will get an error that says "(node:45320) UnhandledPromiseRejectionWarning: Error: insufficient funds for intrinsic transaction cost"

2) Make **sure** you have the following assets in your MetaMask wallet **FOR THE ACCOUNT ADDRESS WITH WHICH YOU ARE USING THE BOT**
    - **BNB** (this is needed for gas)
    - **WBNB** (this is used to purchase the desired token)


# BOT SETUP & CONFIGURATION INSTRUCTIONS

1) Download & Install Node.js - https://nodejs.org/en/

2) Extract the bot zip / download contents to a folder, example 
C:\users\username\Downloads\BHG-wallet-tracked-bot

3) open the command prompt to install the necessary modules for the bot (it should be in the same directory it was earlier when you copy the bot)

```
$ npm install
```

4) After installing modules, type 'npm start' and hit ENTER to run the bot.

```
$ npm start

```
# Usage


1. You have to input the information to run the bot.

```
- Min BNB to follow : Minimum bnb amount of transactions you want to follow. (E.g. 2 BNB : follow more than 2 BNB transactions)

- Wallet Memory

Please add wallet address you want on the wallet memory
 ```

2. if you complete the setting of bot,  you can click the "Start bot" to run the bot  

*** setting ***

Reset or clear the bot's data if you want.


# Test

1) IF you want to TEST the bot using BNB / BUSD, then ADD the BUSD custom token to your MetaMask (0xe9e7cea3dedca5984780bafc599bd69add087d56)

2) Run the bot using the to_Purchase value of the BUSD token contract. This works because liquidity is frequently added to this pool.
