import {withField, WithFieldProps} from "../../Field/HOCs";
import * as Hooks from "../../Field/Hooks";
import * as ServiceHooks from "../../Services/ServiceFactory/Hooks";
import * as DefaultsHooks from "../../Defaults/Hooks";
import * as FormHooks from "../../Form/Hooks";
import {render, waitFor} from "@testing-library/react";
import React from "react";
import {buildMockFieldState} from "../../Utils/TestHelpers";


//TODO : CLEANUP TESTS

const fieldHooksSpy = jest.spyOn(Hooks, 'useField');
const serviceFactorySpy = jest.spyOn(ServiceHooks, 'useServiceFactory');
const defaultsHooksSpy = jest.spyOn(DefaultsHooks, 'useDefaults');
const dispatchHooksSpy = jest.spyOn(FormHooks, 'useDispatch');


describe('WithField', () => {

    it('should render null when field not initialized yet', async function () {
        const dispatchMock = jest.fn();
        fieldHooksSpy.mockReturnValue(undefined as any);
        defaultsHooksSpy.mockReturnValue({} as any);
        serviceFactorySpy.mockReturnValue({createStateUpdater: jest.fn(), createChangeHandler: jest.fn()} as any);
        dispatchHooksSpy.mockReturnValue(dispatchMock);

        const mockedComponent = jest.fn(() => null);
        const FieldComponent = withField(mockedComponent);
        render(<div data-test-id={'wrapper-test'}>
            <FieldComponent name={'test'}/>
        </div>);
        await waitFor(() => expect(mockedComponent).not.toBeCalled());
    });


    it('should inject WithFieldProps', async function () {
        let fieldStateMock = buildMockFieldState();
        const dispatchMock = jest.fn();
        defaultsHooksSpy.mockReturnValue({} as any);
        serviceFactorySpy.mockReturnValue({
            createStateUpdater: () => ({update: jest.fn()}),
            createChangeHandler: jest.fn()
        } as any);
        dispatchHooksSpy.mockReturnValue(dispatchMock);
        fieldHooksSpy.mockReturnValue(fieldStateMock);
        const mockedComponent = jest.fn(() => <div/>);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'} xyz={true}/>);
        await waitFor(() => expect(mockedComponent).toBeCalled());
        const injectedProps: WithFieldProps = {
            handleChange: expect.anything(),
            field: fieldStateMock,
            dispatch: dispatchMock
        };

        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining(injectedProps), expect.anything()));
        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining({
            name: 'test',
            xyz: true,
            initialValue: 'ali'
        }), expect.anything()));
    });


    it('should not render when hidden', async function () {
        const dispatchMock = jest.fn();
        defaultsHooksSpy.mockReturnValue({} as any);
        serviceFactorySpy.mockReturnValue({
            createStateUpdater: () => ({update: jest.fn()}),
            createChangeHandler: jest.fn()
        } as any);
        let fieldStateMock = buildMockFieldState({hidden: true});
        dispatchHooksSpy.mockReturnValue(dispatchMock);
        fieldHooksSpy.mockReturnValue(fieldStateMock);
        const mockedComponent = jest.fn(() => <div/>);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'}/>);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
    });


    it('should inject onChange', async function () {
        const dispatchMock = jest.fn();
        defaultsHooksSpy.mockReturnValue({} as any);
        let mockedHandleMethod = jest.fn();
        serviceFactorySpy.mockReturnValue({
            createStateUpdater: () => ({update: jest.fn()}),
            createChangeHandler: () => ({handle: mockedHandleMethod})
        } as any);
        let fieldStateMock = buildMockFieldState();
        dispatchHooksSpy.mockReturnValue(dispatchMock);
        fieldHooksSpy.mockReturnValue(fieldStateMock);
        const mockedComponent = jest.fn(({handleChange}: any) => {
            handleChange();
            expect(mockedHandleMethod).toBeCalled();
            return null;
        });
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'}/>);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
    });


    it('should update state', async function () {
        const dispatchMock = jest.fn();
        defaultsHooksSpy.mockReturnValue({} as any);
        let mockedUpdateState = jest.fn();
        serviceFactorySpy.mockReturnValue({
            createStateUpdater: () => ({update: mockedUpdateState}),
            createChangeHandler: () => ({})
        } as any);
        dispatchHooksSpy.mockReturnValue(dispatchMock);
        fieldHooksSpy.mockReturnValue(buildMockFieldState());
        const mockedComponent = jest.fn(() => null);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'}/>);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
        expect(mockedUpdateState).toBeCalled();
    });

    it('should initialize fields', async function () {
        const dispatchMock = jest.fn();
        defaultsHooksSpy.mockReturnValue({} as any);
        serviceFactorySpy.mockReturnValue({
            createStateUpdater: () => ({}),
            createChangeHandler: () => ({})
        } as any);
        dispatchHooksSpy.mockReturnValue(dispatchMock);
        fieldHooksSpy.mockReturnValue(undefined as any);
        const mockedComponent = jest.fn(() => null);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name={'test'} initialValue={'ali'}/>);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
        expect(dispatchMock).toBeCalled();
    });


});