'use strict'

import SearchStrategyRegistry from "../utils/searchStrategyRegistry"

export default class SearchHandler {
    constructor() {
        this.strategy = null;
    }

    setSearchStrategy(strategyName) {
        this.strategy = SearchStrategyRegistry[strategyName];
    }

    async search(q) {
        if (this.strategy == null) {
            return;
        }

        return await this.strategy.process(q);
    }
}