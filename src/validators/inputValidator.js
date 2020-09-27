/**
 * Validates query object
 */

export default class InputValidator {
    constructor() {}

    /**
     * Validates request payload for records query object
     * 
     * @param queryObject request payload object
     */
    static validate(queryObject) {
        
        let validationErrorMessages = [];

        if (!queryObject) {            
            validationErrorMessages.push("Request payload is empty.");
        }

        if (!queryObject.q) {            
            validationErrorMessages.push("Query string is empty. Make sure that using 'q' query string parameter for search phrase.");
        }
        if (queryObject.q && queryObject.q.length < 3) {            
            validationErrorMessages.push("Search phrase value is too small. Make sure that using minimum 3 characters as 'q' query string value.");
        }

        return validationErrorMessages;
    }
}