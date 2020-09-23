import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => {
    res.send("online v1");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening");
});