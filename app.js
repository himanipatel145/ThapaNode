const express = require('express');
const app = express();
const port = process.env.PORT || 1497;
require('./src/db/connection');
const Student = require('./src/models/students');
const studentRouter = require('./src/routers/student')

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello")
})

app.use(studentRouter)

app.listen(port, () => {
    console.log("Server is running");
})