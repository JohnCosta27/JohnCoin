const express = require('express');
const crypto = require('crypto')

const app = express();
const port = 3000;

let chain = [{transactions: []}];

const newBlock = () => {
    const hash = crypto.createHash('MD5');
    hash.update(JSON.stringify(chain[chain.length - 1])).end();
    let digest = hash.digest('hex');;
    return {
        transactions: [],
        previousBlockHash: digest,
        pow: 0,
        nonce: Math.floor(Math.random() * 999999) 
    }
}

const mine = async () => {
    let solution = 0;
	console.log('Mining...');

	while (true) {

        const powHash = crypto.createHash('MD5');
        powHash.update((block.nonce + solution).toString()).end();
        const attempt = powHash.digest('hex');

        if (attempt.substr(0, 4) == '0000') {
            console.log(`Solved: ${solution}`);
            block.pow = solution;

            chain.push(block);
            block = newBlock();
            console.log(chain);
        }

        solution++;
    }
}

let block = newBlock();

app.post('/send', async (req, res) => {

    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(JSON.stringify(req.body.transaction));

    const isValid = verifier.verify(req.body.transaction.sender, req.body.signature);
    if (isValid) {
        console.log('Transaction valid');
        res.status(200).send({transaction: "Successful"});
        block.transactions.push(req.body.transaction);
    } else {
        console.log('Transaction invalid');
        res.status(400).send({transaction: "Failed"});
    }
});

app.listen(port, () => {
    console.log(`Miner is listening on port ${port}`);
});

while (true) {
    mine();
}