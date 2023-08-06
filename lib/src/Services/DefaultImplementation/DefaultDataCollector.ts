import {FieldValue, State} from '../../Data/State';
import {DataCollector} from '../Protocol/DataCollector';

export interface DataCollectorOptions {
    [key: string]: (value: FieldValue, state: State) => unknown;
}

export class DefaultDataCollector implements DataCollector {
    constructor(
        protected readonly state: State,
        protected readonly options: DataCollectorOptions,
    ) {}

    collect(): Record<string, unknown> {
        const keys = Object.keys(this.state.fields);
        return keys.reduce(
            (acc, key) => {
                const {value} = this.state.fields[key];
                const customCollector = this.options[key];
                if (customCollector) {
                    acc[key] = customCollector(value, this.state);
                } else {
                    acc[key] = value;
                }
                return acc;
            },
            {} as Record<string, unknown>,
        );
    }
}
