const crypto = require('crypto');
const Block = require('./Block');
const Transaction = require('./Transaction');

class Wallet {
	constructor() {
		const keypair = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2048,
			publicKeyEncoding: { type: 'spki', format: 'pem' },
			privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
		});

		this.publicKey = keypair.publicKey;
		this.privateKey = keypair.privateKey;
	}

	send(amount, reciever) {
		const transaction = new Transaction(amount, this.publicKey, reciever);

		const sign = crypto.createSign('RSA-SHA256');
		sign.update(JSON.stringify(transaction)).end();

		const signature = sign.sign(this.privateKey);

		/**
		 * At this point the transaction needs to be broadcasted across a network to various miners
		 * So that they can add it to a block.
		 */

		return { transaction, signature };
	}
}

module.exports = Wallet;
