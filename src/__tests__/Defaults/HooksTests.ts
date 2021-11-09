import React from "react";
import {Defaults} from "../../Defaults/FormDefaults";
import {useDefaults} from "../../Defaults/Hooks";

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

describe('Defaults Hooks', () => {

    describe('useDefaults', () => {

        it('should return field', function () {
            const mockedDefaults: Defaults = {fieldValue: '', clearValue: '-', valueSelector: e => e};
            useContextMock.mockReturnValue(mockedDefaults);
            const field = useDefaults();
            expect(field).toEqual(mockedDefaults);
        });

    });

})