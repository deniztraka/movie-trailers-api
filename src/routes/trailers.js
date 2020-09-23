"use strict";

import express from 'express';
import authMiddleware from '../auth/okta';

const router = express.Router();

router.get('/v1/trailers', authMiddleware, async (req, res) => {


    await res.json({
        code: 200,
        msg: "Success",
        records: []
    });
});

export default router;