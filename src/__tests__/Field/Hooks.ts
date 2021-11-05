import React from "react";
import {useField} from "../../Field/Hooks";
import {FieldState} from "../../Data/Types/FieldState";

let realUseContext: any;
let useContextMock: any;
// Setup mock
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
    React.useContext = realUseContext;
});

describe('Field Hooks', () => {

    describe('useField', () => {

        it('should return field', function () {
            const mockedField: Partial<FieldState> = {name: 'test', value: 'test-value'};
            useContextMock.mockReturnValue({test: mockedField});
            const field = useField('test');
            expect(field).toEqual(mockedField);
        });

        it('should return undefined when field not exists', function () {
            const mockedField: Partial<FieldState> = {name: 'test', value: 'test-value'};
            useContextMock.mockReturnValue({test: mockedField});
            const field = useField('non-exist-field');
            expect(field).toEqual(undefined);
        });

    });

})