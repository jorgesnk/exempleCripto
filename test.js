const Carteira = require('./carteira')
const Validator = require('./validator')
const BlockChain = require('./blockChain');
const blockChain = new BlockChain();


const carteira = new Carteira();
const validator = new Validator();

const trades = [];
trades.push(carteira.transaction('test', 50));
trades.push(carteira.transaction('test2', 505));
trades.push(carteira.transaction('test3', 500));
trades.forEach((value) => {
    if (!validator.isVerified(value)) {
        throw new Error('invalid transaction', value)
    }
    console.log('all valid')
})

console.log(blockChain.miner('0', trades))




