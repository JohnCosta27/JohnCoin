const crypto = require('crypto');
const Wallet = require('./Wallet');
const Transaction = require('./Transaction');
const Block = require('./Block');
const Chain = require('./Chain');
const http = require('http');

const john = new Wallet();
const rio = new Wallet();

const transaction = john.send(100, rio.publicKey);

const options = {
    hostname: 'localhost',
    port: 300,
    path: '/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': transaction.length
    }
  }
  
  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      console.log(d);
    })
  });

  req.on('error', error => {
    console.error(error)
  })
  
  req.write(transaction);
  req.end();