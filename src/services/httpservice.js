"use strict";

import request from 'request-promise';
/**
 * Base class for HttpServices
 * Using cacing mechanism with redis
 * 
 */
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

    /**
     * Makes async service call
     * @param {string} qs query string oject
     * @returns {Object} service response
     */
    async sendRequest(qs) {
        let extendedQueryStringObject = Object.assign({}, this.options.qs, qs);
        this.options.qs = extendedQueryStringObject;
        return await request(this.options);
    }

    /**
     * 
     * @param {string} keySuffix cache key suffix
     */
    getCache(keySuffix) {
        if(!this.useCaching){
            return null;
        }

        // had to use promise here since redis using callbacks
        return new Promise(resolve => {
            var cacheKey = this.cacheKeyPrefix + keySuffix;

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

    /**
     * 
     * @param {string} key cache key suffix
     * @param {Object} data data to cache
     * @param {number} expInSeconds cache expire time in seconds
     */
    setCache(keySuffix, data, expInSeconds) {
        if(!this.useCaching){
            return;
        }

        var cacheKey = this.cacheKeyPrefix + keySuffix;
        this.redisClient.setex(cacheKey, expInSeconds ? expInSeconds : this.cacheExpInSeconds, JSON.stringify(data));
        console.log('data is cached with the key: ' + cacheKey);
        return data;
    }
}