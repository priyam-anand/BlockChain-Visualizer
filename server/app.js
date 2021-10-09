const app = require("express")();
const morgan = require("morgan");
const http = require("http").createServer(app);
const sha256 = require("crypto-js/sha256");
const body_parser = require("body-parser");

// middleware
app.use(morgan("common"));
app.use(body_parser.json());

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
let difficulty = 1;

const addNewBlock = (block) => {
    blockchain.push(block);
}
const getPreviousBlock = () => {
    return blockchain[blockchain.length - 1];
}
const hashBlock = (block) => {
    return sha256(block.index + " " + block.timestap + " " + block.data + " " + block.prev_hash + " " + block.nonce).toString();
}
const getProof = (data) => {
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
        if (hasProof(hash)) {
            console.log("Newly mined block");
            console.log(block);
            console.log("with hash = " + hash);
            break;
        }
        currProof++;
    }
    return block;
}
const getGenesis = (data) => {
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
        if (hasProof(hash)) {
            console.log("Newly mined block");
            console.log(block);
            console.log("with hash = " + hash);
            break;
        }
        currProof++;
    }
    return block;
}
const hasProof = (hash) => {
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

// endpoint
app.post("/setDiff", (req, res) => {
    try {
        if (blockchain.length !== 0) {
            res.status(400).json("Difficulty is already set");
            return;
        }
        const sentDiff = req.body.diff;
        console.log("got difficulty of " + sentDiff);
        difficulty = sentDiff;
        res.status(200).json("difficulty is set.... Now mining genesis block");
        const block = getGenesis("This is the genesis block");
        addNewBlock(block);
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

app.post("/addBlock", (req, res) => {
    try {
        if(blockchain.length===0)
        {
            res.status(401).json("set the difficulty first");
            return;
        }
        const data = req.body.data;
        res.status(200).json("Mining a new Block");
        const block = getProof(data);
        addNewBlock(block);
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

app.get("/getChain",(req,res)=>{
    try{
        res.status(200).json(getChain());
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})

app.get("/getLastBlock",(req,res)=>{
    try{
        const prev =getPreviousBlock();
        res.status(200).json(prev);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
    
})



http.listen(8000, () => {
    console.log("server running at port 8000");
})