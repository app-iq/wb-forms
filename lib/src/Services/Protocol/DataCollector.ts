export interface DataCollector {
    collect(): Record<string, unknown>;
}
