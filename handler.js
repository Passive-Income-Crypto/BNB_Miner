"use strict";

const Web3 = require("web3");

// Create Web3 instance
const web3 = new Web3("https://bsc.nodereal.io"); // Insert your RPC URL here

// Import the contract abi
const abi = require("./abi").result;

const accountFrom = {
  privateKey: process.env.privateKey,
  publicKey: process.env.publicKey,
};
const contractAddress = "0xce93f9827813761665ce348e33768cb1875a9704";

module.exports.compound = async (event) => {
  const transaction = new web3.eth.Contract(abi, contractAddress);
  const transactionTx = transaction.methods.hatchEggs(accountFrom.publicKey);
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: transactionTx.encodeABI(),
      gas: 100000,
    },
    accountFrom.privateKey
  );
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

module.exports.sell = async (event) => {
  const transaction = new web3.eth.Contract(abi, contractAddress);
  const transactionTx = transaction.methods.sellEggs();
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: transactionTx.encodeABI(),
      gas: 100000,
    },
    accountFrom.privateKey
  );
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};
