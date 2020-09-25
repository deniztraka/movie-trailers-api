import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import trailersRoute from './routes/trailers';
import moviesRoute from './routes/movies';
import searchRoute from './routes/search';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
// env variables


const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//routes
app.use('/', trailersRoute);
app.use('/', moviesRoute);
app.use('/', searchRoute);

import errorHandler from './middlewares/errorHandler';
app.use('/', errorHandler);

app.get("/", (req, res) => {
    res.send("online check");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is up!");
});