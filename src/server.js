import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import redis from 'redis';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';


const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// env variables
dotenv.config();

// redis test
var redisClient = redis.createClient(6379, process.env.REDIS_CLUSTER_HOST);
redisClient.on('connect', function () {
    console.log('redis client is succesfully connected on host ' + process.env.REDIS_CLUSTER_HOST);
});
redisClient.on('error', function (err) {
    console.log('error on redis client connection on host ' + process.env.REDIS_CLUSTER_HOST + ' - ' + err);
});

//routes
import trailersRoute from './routes/trailers';
app.use('/', trailersRoute);

app.get("/", (req, res) => {
    res.send("online v1");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening");
});