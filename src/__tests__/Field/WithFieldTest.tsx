import {withField, WithFieldProps} from "../../Field/WithField";
import * as Hooks from "../../Field/Hooks";
import {render, waitFor} from "@testing-library/react";
import React from "react";
import {FieldActions} from "../../Data/Actions/Field/FieldActions";


const spy = jest.spyOn(Hooks, 'useField');


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


describe('WithField', () => {

    it('should render null when field not initialized yet', async function () {
        spy.mockReturnValue(undefined as any);
        const mockedComponent = jest.fn(() => null);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'}/>);
        await waitFor(() => expect(mockedComponent).not.toBeCalled());
    });


    it('should inject WithFieldProps', async function () {
        let fieldStateMock = {name: 'test', value: '', valueSelector: (e: any) => e};
        let dispatchMock = jest.fn();
        spy.mockReturnValue(fieldStateMock);
        useContextMock.mockReturnValue(dispatchMock);
        const mockedComponent = jest.fn(() => <div/>);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'}/>);
        await waitFor(() => expect(mockedComponent).toBeCalled());
        const injectedProps: WithFieldProps = {
            handleChange: expect.anything(),
            field: fieldStateMock,
            dispatch: dispatchMock
        };

        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining(injectedProps), expect.anything()));
        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining({name: 'test'}), expect.anything()));
        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining({initialValue: 'ali'}), expect.anything()));
    });


    it('should make handleChange dispatch changeValue action', async function () {
        let fieldStateMock = {name: 'test', value: '', valueSelector: (e: any) => e};
        let dispatchMock = jest.fn();
        spy.mockReturnValue(fieldStateMock);
        useContextMock.mockReturnValue(dispatchMock);
        const mockedComponent = jest.fn(({handleChange}: WithFieldProps) => {
            handleChange('test-value');
            expect(dispatchMock).toBeCalledWith(FieldActions.changeValue('test', 'test-value'));
            return <div/>;
        });
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'}/>);
        await waitFor(() => expect(mockedComponent).toBeCalled());
    });

})