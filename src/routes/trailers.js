"use strict";

import express from 'express';
import dotenv from 'dotenv';
import LocalServiceRegistry from '../utils/localServiceRegistry';
import authMiddleware from '../middlewares/auth';
import inputValidationMiddleware from '../middlewares/inputValidationMiddleware';

const router = express.Router();
router.get('/api/v1/trailers', inputValidationMiddleware, authMiddleware, async (req, res) => {
    dotenv.config();

    // get search phrase
    var searchPhrase = req.query.q;

    var localServiceRegistery = new LocalServiceRegistry();
    var videoSearchService = localServiceRegistery.get(process.env.VIDEO_SEARCH_SERVICE);

    //video search service request
    var records = await videoSearchService.sendRequest({
        q: searchPhrase,
        part: 'snippet,id',
        maxResults: 25,
        topicId: '/m/02vxn',
        type: 'video',
        videoDuration: 'short',
        videoEmbeddable: true,
        videoSyndicated: true
    });

    res.json({
        status: 200,
        msg: "Success",
        records: records
    });
});

export default router;