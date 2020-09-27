"use strict";
/**
 * I implemented this to get only trailers by using two service at the same time.
 * It is made by misudnerstanding of the assignment but it has some cool usages.
 * 
 * It uses strategy pattern for search
 * It can be improved by implementing new search trategies by creating new search strategy class extended from baseSearchStrategy.js
 * 
 * This is not fully implemented right now.
 * 
 */
import express from 'express';
import dotenv from 'dotenv';
import SearchHandler from '../search/searchHandler'
import authMiddleware from '../middlewares/auth';
import inputValidationMiddleware from '../middlewares/inputValidationMiddleware';

const router = express.Router();
router.get('/api/v1/search/', inputValidationMiddleware, authMiddleware, async (req, res) => {
    dotenv.config();

    // get search phrase
    var searchPhrase = req.query.q;

    // build configured search strategy
    var searchHandler = new SearchHandler();
    searchHandler.setSearchStrategy(process.env.SEARCH_STRATEGY);

    //search for it
    var records = await searchHandler.search(searchPhrase);

    //set response
    res.json({
        status: 200,
        msg: "Success",
        records: records
    });
});

export default router;