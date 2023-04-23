import {useField} from '../../Field/Hooks';
import {useState} from 'wb-core-provider';
import {FieldState} from '../../Data/State';
import Mock = jest.Mock;

jest.mock('wb-core-provider', () => {
    return {
        useState: jest.fn(),
    };
});

describe('Field Hooks', () => {

    describe('useField', () => {

        it('should return field', function () {
            const mockedField: Partial<FieldState> = {name: 'test', value: 'test-value'};
            (useState as Mock).mockReturnValue({fields: {test: mockedField}});
            const field = useField('test');
            expect(field).toEqual(mockedField);
        });

        it('should return undefined when field not exists', function () {
            const mockedField: Partial<FieldState> = {name: 'test', value: 'test-value'};
            (useState as Mock).mockReturnValue({fields: {test: mockedField}});
            const field = useField('non-exist-field');
            expect(field).toEqual(undefined);
        });

    });

});
