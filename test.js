const Carteira = require('./carteira')
const Validator = require('./validator')
const BlockChain = require('./blockChain');
const fs = require('fs')
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
})

const blockOne = blockChain.miner('0', trades)
console.log(blockOne.hash)
const tradeTwo = [];

tradeTwo.push(carteira.transaction('test4', 500))
tradeTwo.push(carteira.transaction('test5', 501))
tradeTwo.push(carteira.transaction('test6', 520))

tradeTwo.forEach((value) => {
    if (!validator.isVerified(value)) {
        throw new Error('invalid transaction', value)
    }
})


const blockTwo = blockChain.miner(blockOne.hash, tradeTwo)

console.log(blockTwo.hash)


blockChain.validateBlock(blockOne.hash, blockTwo.hash, blockTwo.nonce, blockTwo.data);

const tradeThree = [];

tradeThree.push(carteira.transaction('test7', 500))
tradeThree.push(carteira.transaction('test8', 501))
tradeThree.push(carteira.transaction('test9', 520))
tradeThree.forEach((value) => {
    if (!validator.isVerified(value)) {
        throw new Error('invalid transaction', value)
    }
})

const blockThree = blockChain.miner(blockTwo.hash, tradeThree);

console.log(blockThree.hash)

blockChain.validateBlock(blockTwo.hash, blockThree.hash, blockThree.nonce, blockThree.data);

fs.writeFileSync('block1.json', JSON.stringify(blockOne))
fs.writeFileSync('block2.json', JSON.stringify(blockTwo))
fs.writeFileSync('block3.json', JSON.stringify(blockThree))

