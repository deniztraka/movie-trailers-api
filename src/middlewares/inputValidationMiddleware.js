'use strict'

/**
 * Input validation middleware that checks requests for query strings
 */

import ValidationError from "../error/validationError";
import InputValidator from "../validators/inputValidator";

module.exports = function (req, res, next) {
    try {
        // validating query strying parameters 
        var validationErrorMessages = InputValidator.validate(req.query);
        if (validationErrorMessages.length > 0) {
            throw new ValidationError('Request payload is not valid.', validationErrorMessages);
        }

        next();
    } catch (error) {
        next(error)
    }
};