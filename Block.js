const crypto = require('crypto');

class Block {
	constructor() {
		this.nonce = Math.random() * 9999999 + 500000;
		this.transactions = [];
	}

	addTransaction(transaction, signature) {
		const verifier = crypto.createVerify('RSA-SHA256');
		verifier.update(JSON.stringify(transaction));

		const isValid = verifier.verify(transaction.sender, signature);
		if (isValid) {
			console.log('Transaction valid');
			this.transactions.push(transaction);
		} else {
			console.log('Transaction invalid');
		}
	}

	mine() {
		let solution = 0;
		console.log('Mining...');

		while (true) {
			const hash = crypto.createHash('MD5');
			hash.update((this.nonce + solution).toString()).end();

			const attempt = hash.digest('hex');
			if (attempt.substr(0, 4) == '0000') {
				console.log(`Solved: ${solution}`);
				this.pow = solution;
				return solution;
			}

			solution++;
		}
	}
}

module.exports = Block;
