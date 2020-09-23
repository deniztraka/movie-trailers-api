import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());

var redis = require('redis');

var redisClient = redis.createClient(6379, process.env.REDIS_CLUSTER_HOST);

redisClient.on('connect', function () {
    console.log('redis client is succesfully connected on host ' + process.env.REDIS_CLUSTER_HOST);
});

redisClient.on('error', function (err) {
    console.log('error on redis client connection on host ' + process.env.REDIS_CLUSTER_HOST + ' - ' + err);
});

//routes
app.get("/", (req, res) => {
    res.send("online v1");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening");
});