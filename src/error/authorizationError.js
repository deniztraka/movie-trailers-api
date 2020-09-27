'use strict'
/**
 * Custom Error - Authorization Error 
 */
export default class AuthorizationError extends Error {
    constructor(message, validationErrors) {        
        super(message);
        this.validationErrors = validationErrors;
        this.name = 'AuthorizationError';
    }
}