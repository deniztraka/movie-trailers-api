"use strict";
/**
 * Movies Endpoint for API
 * Version: v1
 */
import express from 'express';
import dotenv from 'dotenv';
import LocalServiceRegistry from '../utils/localServiceRegistry';
import authMiddleware from '../middlewares/auth';
import InputValidationMiddleware from '../middlewares/inputValidationMiddleware';

const router = express.Router();
// first check for if the input given is correct
// then check auth
router.get('/api/v1/movies', InputValidationMiddleware, authMiddleware, async (req, res) => {
    dotenv.config();

    // get search phrase
    var searchPhrase = req.query.q;

    // building the service
    var localServiceRegistery = new LocalServiceRegistry();
    var movieSearchService = localServiceRegistery.get(process.env.MOVIE_SEARCH_SERVICE);

    // search request to movie data service
    var records = await movieSearchService.sendRequest({
        q: searchPhrase
    });

    //set response
    res.json({
        status: 200,
        msg: "Success",
        records: records
    });

});

export default router;