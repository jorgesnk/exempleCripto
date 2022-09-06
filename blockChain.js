const crypto = require("crypto");

class BlockChain {
    constructor() {
        this._level = 3
    }


    genLevel(current) {
        if (!current) {
            return this.genLevel('0');
        }
        if (current.length < this._level) {
            return this.genLevel(current + "0")
        }
        return current
    }

    miner(prev, data) {
        const prevValue = prev || '0'
        const hash = crypto.createHash('sha256')
        const nonce = crypto.randomUUID();
        hash.update(`${prevValue}${JSON.stringify(data)}${nonce}`)
        const code = hash.digest('hex');
        console.log(code,'eita');
        if (code.substr(0, this._level) === this.genLevel()) {
            return { prevValue, hash, data, nonce }
        }
        return this.miner(prevValue, data);
    }

}
module.exports = BlockChain