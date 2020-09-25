import DetailedSearchStrategy from "../search/detailedSearchStrategy";
import DetailedSearchStrategyParallel from "../search/detailedSearchStrategyParallel";

module.exports = {
    detailed: new DetailedSearchStrategy(),
    detailedParallel: new DetailedSearchStrategyParallel()
};