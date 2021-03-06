'use strict'

/**
 * Authorization middleware that uses OKTA Auth Service
 */

import AuthorizationError from '../error/authorizationError'
import ValidationError from '../error/validationError'

module.exports = (err, req, res, next) => {
    if (err) {
        console.log(err);
    }

    //check different type of errors
    if (err instanceof ValidationError) {
        res.status(400);
        res.json({
            code: 400,
            msg: err.validationErrors[0],
        });
    } else if (err instanceof AuthorizationError) {
        res.status(403);
        res.json({
            status: 403,
            msg: err.message
        });
    } else if (err.name == 'JwtParseError') {
        res.status(403);
        res.json({
            status: 403,
            msg: err.message
        });
    } else if (err) {
        res.status(500);
        res.json({
            code: 500,
            msg: "We are having problems on our server now. Please try again later."
        });
        res.send();
    }
};