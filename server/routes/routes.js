const app = require("express").Router();
const functions = require("../BlockChain Operations");

let difficulty = 1;

app.post("/setDiff", (req, res) => {
    try {
        if (functions.blockchain.length !== 0) {
            res.status(400).json("Difficulty is already set");
            return;
        }
        const sentDiff = req.body.diff;
        console.log("got difficulty of " + sentDiff);
        difficulty = sentDiff;
        res.status(200).json("difficulty is set.... Now mining genesis block");
        const block = functions.getGenesis("This is the genesis block",difficulty);
        functions.addNewBlock(block);
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

app.post("/addBlock", (req, res) => {
    try {
        if (functions.blockchain.length === 0) {
            res.status(401).json("set the difficulty first");
            return;
        }
        const data = req.body.data;
        res.status(200).json("Mining a new Block");
        const block = functions.getProof(data,difficulty);
        functions.addNewBlock(block);
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

app.get("/getChain", (req, res) => {
    try {
        res.status(200).json(functions.getChain());
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

app.get("/getLastBlock", (req, res) => {
    try {
        const prev = functions.getPreviousBlock();
        res.status(200).json(prev);
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }

})

app.get("/isValid", (req, res) => {
    try {
        const valid = functions.checkValidity(difficulty);
        if (valid) {
            res.status(200).json("The block Chain is valid");
            return;
        } else {
            res.status(200).json("The block Chain is NOT valid");
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

module.exports = app;