import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());

var redis = require('redis');
var redisClient = redis.createClient(6379,"mycachecluster.6i0cy3.ng.0001.eun1.cache.amazonaws.com");

redisClient.on('connect', function () {
    console.log('redis client is succesfully connected.');
});
 
redisClient.on('error', function (err) {
    console.log('error on redis client connection' + err);
});

//routes
app.get("/", (req, res) => {
    res.send("online v1");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening");
});