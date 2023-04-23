import React from 'react';
import {Defaults, useDefaults} from '../../Defaults/DefaultsContext';

let realUseContext: <T = unknown>(context: React.Context<T>) => T;
let useContextMock: jest.Mock;
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});
afterEach(() => {
    React.useContext = realUseContext;
});


describe('useDefaults', () => {

    it('should return default value', function () {
        const mockedDefaults: Defaults = {fieldValue: '', clearValue: '-', valueSelector: e => e};
        useContextMock.mockReturnValue(mockedDefaults);
        const defaultValues = useDefaults();
        expect(defaultValues).toEqual(mockedDefaults);
    });

});
