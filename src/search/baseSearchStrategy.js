'use strict'

export default class BaseSearchStrategy {
    constructor() {
        
    }

    process(q){
        throw new TypeError("Do not call abstract method process from base class.");        
    }
}