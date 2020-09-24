"use strict";

import request from 'request-promise';

export default class HttpService {
    constructor(options) {
        this.options = options;
    }

    async sendRequest(qs) {
        let extendedQueryStringObject = Object.assign({}, this.options.qs, qs);
        this.options.qs = extendedQueryStringObject;
        var response = await request(this.options);
        return response;
    }
}