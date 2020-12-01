const express = require('express');
const app = express();
const port = process.env.PORT || 9714;
require('./db/connections');
const MensRanking = require('./models/mens');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello")
    console.log("hello new");
})

app.post("/mens", async (req, res) => {
    try {
        const addingMensRecords = new MensRanking(req.body)
        console.log(req.body);
        const createMen = await addingMensRecords.save();
        res.status(200).send(createMen)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/mens", async (req, res) => {
    try {
        const getMens = await MensRanking.find({}).sort({"ranking":1});
        res.status(200).send(getMens)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const getMen = await MensRanking.findById({ _id: _id });
        res.status(200).send(getMen)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.patch("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const getMen = await MensRanking.findByIdAndUpdate({ _id: _id }, req.body, { new: true });
        res.status(200).send(getMen)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const deleteMen = await MensRanking.findByIdAndDelete({ _id: _id }, req.body);
        res.status(200).send(deleteMen)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log("Server is running");
})