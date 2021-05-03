export class Stats {
    startDate: Date;
    endDate?: Date;
    aggregatedBy?: string;
}

export default class Statistics {
    constructor(data?: Stats);

    fromData(data: Stats): void;

    /**
     * To JSON
     */
    toJSON(): Stats;

    /**
     * Get Advanced Statistics
     */
    getAdvanced();

    /**
     * Get Category Statistics
     */
    getCategory();

    /**
     * Get Global Statistics
     */
    getGlobal();

    /**
     * Get Parse Statistics
     */
    getParse();

    /**
     * Get Subuser Statistics
     */
    getSubuser();

    /**
     * Set StartDate
     */
    setStartDate(startDate: Date): void;

    /**
     * Set EndDate
     */
    setEndDate(endDate: Date): void;

    /**
     * Set AggregatedBy
     */
    setAggregatedBy(aggregatedBy: string): void;
}