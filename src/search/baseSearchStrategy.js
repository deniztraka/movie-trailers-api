'use strict'
/**
 * Abstract base class for Search Strategy
 */
export default class BaseSearchStrategy {
    constructor() {
        
    }

    /**
     * Abstract process function for search strategies
     * @param {string} q 
     * @return {Object} search result
     */
    process(q){
        throw new TypeError("Do not call abstract method process from base class.");        
    }
}