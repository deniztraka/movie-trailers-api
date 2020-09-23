"use strict";

import express from 'express';
const router = express.Router();

router.get('/v1/trailers', async (req, res) => {
    

    await res.json({
        code: 200,
        msg: "Success",
        records: []
    });
});

export default router;