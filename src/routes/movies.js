"use strict";

import express from 'express';
import authMiddleware from '../auth/okta';
import dotenv from 'dotenv';
import LocalServiceRegistry from '../utils/localServiceRegistry';

const router = express.Router();

router.get('/v1/movies', authMiddleware, async (req, res) => {
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
        code: 200,
        msg: "Success",
        records: records
    });
});

export default router;