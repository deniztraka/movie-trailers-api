'use strict'

/**
 * Redis client 
 */

import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// creating redis client for application usage
var redisClient = redis.createClient(6379, process.env.REDIS_CLUSTER_HOST);

redisClient.on('connect', function () {
    console.log('redis client is succesfully connected on host ' + process.env.REDIS_CLUSTER_HOST);
});
redisClient.on('error', function (err) {
    console.log('error on redis client connection on host ' + process.env.REDIS_CLUSTER_HOST + ' - ' + err);
});
module.exports = redisClient;