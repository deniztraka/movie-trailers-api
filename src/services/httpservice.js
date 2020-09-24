"use strict";

import request from 'request-promise';
import redisClient from '../redis/redisClient';

export default class HttpService {
    constructor(options, cacheKeyPrefix, cacheExp ) {
        this.cacheKeyPrefix = cacheKeyPrefix;
        this.options = options;
        this.cacheExpInSeconds = cacheExp ? cacheExp : 3600;
    }

    async sendRequest(qs) {
        let extendedQueryStringObject = Object.assign({}, this.options.qs, qs);
        this.options.qs = extendedQueryStringObject;
        var response = await request(this.options);
        return response;
    }

    getCache(key) {
        return new Promise(resolve => {
            var cacheKey = this.cacheKeyPrefix + key;

            redisClient.get(cacheKey, function (err, cachedData) {
                if (err) throw err;
    
                if (cachedData != null) {
                    console.log('data is found in the cache with the key: ' + cacheKey);
                    resolve(JSON.parse(cachedData));                    
                }

                resolve();
            }); 
        });
    }

    setCahce(key, data) {
        var cacheKey = this.cacheKeyPrefix + key;
        redisClient.setex(cacheKey, this.cacheExpInSeconds, JSON.stringify(data));
        console.log('data is cached with the key: ' + cacheKey);
        return data;
    }
}