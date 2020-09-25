import ValidationError from "../error/validationError";
import InputValidator from "../validators/inputValidator";

module.exports = function (req, res, next) {
    try {
        console.log(req.query);
        var validationErrorMessages = InputValidator.validate(req.query);
        console.log(validationErrorMessages.length);
        if (validationErrorMessages.length > 0) {
            throw new ValidationError('Request payload is not valid.', validationErrorMessages);
        }
        
        next();
    } catch (error) {
        console.log(error.message);
        next(error)
    }
};

