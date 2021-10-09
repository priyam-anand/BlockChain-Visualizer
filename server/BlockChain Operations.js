const sha256 = require("crypto-js/sha256");

let blockchain = [];

/*
structure of a block = {
    index : blockchain.lenght,
    timestamp : new Date(),
    data : data,
    previous_hash : prev_hash,
    nonce : nonce,
}
*/

const addNewBlock = (block) => {
    blockchain.push(block);
}
const getPreviousBlock = () => {
    return blockchain[blockchain.length - 1];
}
const hashBlock = (block) => {
    return sha256(block.index + " " + block.timestap + " " + block.data + " " + block.prev_hash + " " + block.nonce).toString();
}
const getProof = (data,difficulty) => {
    let currProof = 1;
    const previous_hash = hashBlock(getPreviousBlock());
    let block = {
        index: blockchain.length,
        timestap: new Date(),
        data: data,
        previous_hash: previous_hash,
        nonce: currProof,
    }
    while (true) {
        block = { ...block, nonce: currProof, timestap: new Date() };
        const hash = hashBlock(block);
        if (hasProof(hash,difficulty)) {
            console.log("Newly mined block");
            console.log(block);
            console.log("with hash = " + hash);
            break;
        }
        currProof++;
    }
    return block;
}
const getGenesis = (data,difficulty) => {
    let currProof = 1;
    let prev = "";
    for (let i = 0; i < 64; i++)
        prev = prev + "0";
    let block = {
        index: blockchain.length,
        timestap: new Date(),
        data: data,
        previous_hash: prev,
        nonce: currProof,
    }
    while (true) {
        block = { ...block, nonce: currProof, timestap: new Date() };
        const hash = hashBlock(block);
        if (hasProof(hash,difficulty)) {
            console.log("Newly mined block");
            console.log(block);
            console.log("with hash = " + hash);
            break;
        }
        currProof++;
    }
    return block;
}
const hasProof = (hash,difficulty) => {
    for (let i = 0; i < difficulty; i++) {
        if (hash.charAt(i) !== '0')
            return false;
    }
    return true;
}
const getChain = () => {
    console.log(blockchain);
    return blockchain;
}
const checkValidity = (difficulty) => {
    const hash0 = hashBlock(blockchain[0]);
    if (!hasProof(hash0,difficulty)) {
        return false;
    }
    for (let i = 1; i < blockchain.length; i++) {
        const prev = blockchain[i - 1];
        const prev_hash = hashBlock(prev);
        const curr = blockchain[i];
        if (curr.previous_hash !== prev_hash) {
            return false;
        }
        const hash = hashBlock(curr);
        if (!hasProof(hash,difficulty)) {
            return false;
        }
    }
    return true;
}

module.exports = {blockchain,addNewBlock,getPreviousBlock,hashBlock,getProof,getGenesis,hasProof,getChain,checkValidity};