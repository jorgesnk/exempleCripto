const crypto = require("crypto");

class BlockChain {
    constructor() {
        this._level = 3
    }


    genLevel() {

        let level = '';

        for (let i = 0; i < this._level; i++) {
            level = level.concat('0')
        }

        return level
    }

    miner(prev, data) {
        let hash = crypto.createHash('sha256')
        const level = this.genLevel();
        let nonce = crypto.randomUUID();
        hash.update(`${prev}${JSON.stringify(data)}${nonce}`)

        let code = hash.digest('hex');

        while (code.slice(0, this._level) !== level) {
            hash = crypto.createHash('sha256')
            nonce = crypto.randomUUID();
            hash.update(`${prev}${JSON.stringify(data)}${nonce}`);
            code = hash.digest('hex');
        }

        return { prev, hash: code, data, nonce }
    }
    validateBlock(prev, hash, nonce, data) {
        const compareHash = crypto.createHash('sha256')
            .update(`${prev}${JSON.stringify(data)}${nonce}`).digest('hex');
        if (compareHash !== hash) {
            throw new Error("invalid block compare")
        }


    }

}
module.exports = BlockChain