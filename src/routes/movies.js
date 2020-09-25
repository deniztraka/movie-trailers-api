"use strict";

import express from 'express';
import dotenv from 'dotenv';
import LocalServiceRegistry from '../utils/localServiceRegistry';
import authMiddleware from '../middlewares/auth';
import InputValidationMiddleware from '../middlewares/inputValidationMiddleware';

const router = express.Router();
router.get('/api/v1/movies', InputValidationMiddleware, authMiddleware, async (req, res) => {
    dotenv.config();

    // get search phrase
    var searchPhrase = req.query.q;

    var localServiceRegistery = new LocalServiceRegistry();
    var movieSearchService = localServiceRegistery.get(process.env.MOVIE_SEARCH_SERVICE);

    // movie search request
    var records = await movieSearchService.sendRequest({
        q: searchPhrase
    });

    res.json({
        status: 200,
        msg: "Success",
        records: records
    });

});

export default router;