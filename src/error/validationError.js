export default class ValidationError extends Error {
    constructor(message, validatinErrors) {
        super(message);
        this.validationErrors = validatinErrors;
        this.name = 'ValidationError';
    }
}