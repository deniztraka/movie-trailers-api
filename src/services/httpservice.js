"use strict";

import request from 'request-promise';

export default class HttpService {
    constructor(options, useCaching, cacheKeyPrefix, cacheExp) {
        this.cacheKeyPrefix = cacheKeyPrefix;
        this.options = options;
        this.cacheExpInSeconds = cacheExp ? cacheExp : 3600;
        this.useCaching = useCaching;
        if (useCaching) {
            this.redisClient = require('../redis/redisClient');
        }
    }

    async sendRequest(qs) {
        let extendedQueryStringObject = Object.assign({}, this.options.qs, qs);
        this.options.qs = extendedQueryStringObject;
        return await request(this.options);
    }

    getCache(key) {
        if(!this.useCaching){
            return null;
        }

        return new Promise(resolve => {
            var cacheKey = this.cacheKeyPrefix + key;

            this.redisClient.get(cacheKey, function (err, cachedData) {
                if (err) throw err;

                if (cachedData != null) {
                    console.log('data is found in the cache with the key: ' + cacheKey);
                    resolve(JSON.parse(cachedData));
                }

                resolve();
            });
        });
    }

    setCache(key, data, expInSeconds) {
        if(!this.useCaching){
            return;
        }

        var cacheKey = this.cacheKeyPrefix + key;
        this.redisClient.setex(cacheKey, expInSeconds ? expInSeconds : this.cacheExpInSeconds, JSON.stringify(data));
        console.log('data is cached with the key: ' + cacheKey);
        return data;
    }
}