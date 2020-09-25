"use strict";

import express from 'express';
import authMiddleware from '../auth/okta';
import dotenv from 'dotenv';
import SearchHandler from '../search/searchHandler'

const router = express.Router();

router.get('/v1/trailers', authMiddleware, async (req, res) => {
    dotenv.config();

    // get search phrase
    var searchPhrase = req.query.q;
    
    var searchHandler = new SearchHandler();
    searchHandler.setSearchStrategy(process.env.SEARCH_STRATEGY);
    var records = await searchHandler.search(searchPhrase);

    res.json({
        code: 200,
        msg: "Success",
        records: records
    });
});

export default router;