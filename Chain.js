const Block = require('./Block');

class Chain {
	constructor() {
		this.chain = [new Block()];
	}

	addBlock(block) {
		/**
		 * Here is where you would verify the block is correct
		 * TODO: Verify blocks and stuff
		 */

		this.chain.push(block);
	}
}

module.exports = Chain;
