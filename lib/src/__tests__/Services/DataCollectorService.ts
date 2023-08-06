import {DataCollectorOptions, DefaultDataCollector} from '../../Services/DefaultImplementation/DefaultDataCollector';
import {buildMockFieldState, buildMockFormState} from '../Utils/TestHelpers';
import {State} from '../../Data/State';

const state: State = {
    fields: {
        id: buildMockFieldState(),
        name: buildMockFieldState({value: 'Ali'}),
        username: buildMockFieldState({value: 'ali123'}),
        email: buildMockFieldState({value: 'ali@wb.com'}),
        info: {
            value: [
                {key: 'height', value: '180'},
                {key: 'weight', value: '80'},
                {key: 'age', value: '30'},
            ],
            ready: true,
            valid: [true, true, true],
        },
    },
    form: buildMockFormState(),
};

test('should collect data', () => {
    const randomId = Math.random();
    const options: DataCollectorOptions = {
        id: () => randomId,
        name: (value: string) => value.toUpperCase(),
        info: (value: { key: string; value: string }[]) => {
            return value.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as Record<string, string>);
        },
        nonExistingField: () => 'non-existing-field',
    };
    const collector = new DefaultDataCollector(state, options);
    const data = collector.collect();
    expect(data).toEqual({
        id: randomId,
        name: 'ALI',
        username: 'ali123',
        email: 'ali@wb.com',
        info: {
            height: '180',
            weight: '80',
            age: '30',
        }
    });
});
