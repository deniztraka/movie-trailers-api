'use strict'

/**
 * Search Strategy object builder.
 */

import SearchStrategyRegistry from "../utils/searchStrategyRegistry"

export default class SearchHandler {
    constructor() {
        this.strategy = null;
    }

    /**
     * Setter for strategy prop
     * @param {string} strategyName 
     */
    setSearchStrategy(strategyName) {
        this.strategy = SearchStrategyRegistry[strategyName];
    }

    /**
     * Process search alghoritm
     * @param {string} q search phrase
     * @returns {Object[]} search result items
     */
    async search(q) {
        if (this.strategy == null) {
            return;
        }

        return await this.strategy.process(q);
    }
}