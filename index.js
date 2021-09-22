const crypto = require('crypto');
const Wallet = require('./Wallet');
const Transaction = require('./Transaction');
const Block = require('./Block');
const Chain = require('./Chain');

let chain = new Chain();

const john = new Wallet();
const rio = new Wallet();

const transaction1 = john.send(100, rio.publicKey);
console.log(transaction1);

const block1 = new Block();
block1.addTransaction(transaction1.transaction, transaction1.signature);
block1.addTransaction(transaction1.transaction, transaction1.signature);
block1.addTransaction(transaction1.transaction, transaction1.signature);
block1.mine();
chain.addBlock(block1);

console.log(chain);
