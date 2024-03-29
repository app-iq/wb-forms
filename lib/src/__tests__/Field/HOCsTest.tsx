import {render, waitFor} from '@testing-library/react';
import * as TypeMoq from 'typemoq';
import {DispatchFunction, useServiceFactory, useDispatch} from 'wb-core-provider';
import {withField} from '../../Field/WithField';
import * as Hooks from '../../Field/Hooks';
import * as FieldConfigurationsContext from '../../Field/FieldConfigurationContext';
import {buildMockFieldState} from '../Utils/TestHelpers';
import {FieldState} from '../../Data/State';
import {ServiceFactory} from '../../Services/ServiceFactory/ServiceFactory';
import {FieldConfiguration} from '../../Field/FieldProps';
import {ChangeHandler} from '../../Services/Protocol/ChangeHandler';
import SpyInstance = jest.SpyInstance;
import Mock = jest.Mock;
import {WithFieldProps} from '../../Field/BaseFieldComponent';

jest.mock('wb-core-provider', () => {
    return {
        useDispatch: jest.fn(),
        useServiceFactory: jest.fn(),
    };
});

const fieldHooksSpy: SpyInstance<FieldState | undefined> = jest.spyOn(Hooks, 'useField');
const fieldConfigurationHookSpy: SpyInstance<FieldConfiguration> = jest.spyOn(
    FieldConfigurationsContext,
    'useFieldConfiguration',
);

describe('WithField', () => {
    const setupHooks = (hooks: {
        serviceFactory?: ServiceFactory | false;
        dispatch?: DispatchFunction | false;
        field?: FieldState | false;
        fieldConfiguration?: FieldConfiguration | false;
    }) => {
        const dispatchMock = jest.fn();
        const serviceFactoryMock = TypeMoq.Mock.ofType<ServiceFactory>();
        if (hooks.field !== false) {
            fieldHooksSpy.mockReturnValue(hooks.field);
        }
        if (hooks.serviceFactory !== false) {
            (useServiceFactory as Mock).mockReturnValue(hooks.serviceFactory ?? serviceFactoryMock.object);
        }
        if (hooks.dispatch !== false) {
            (useDispatch as Mock).mockReturnValue(hooks.dispatch ?? dispatchMock);
        }
        if (hooks.fieldConfiguration !== false) {
            fieldConfigurationHookSpy.mockReturnValue(hooks.fieldConfiguration ?? {});
        }
        return {dispatchMock, serviceFactoryMock};
    };

    it('should render null when field not initialized yet', async () => {
        const {serviceFactoryMock} = setupHooks({});
        serviceFactoryMock.setup(sf => sf.createChangeHandler).returns(() => jest.fn());
        const mockedComponent = jest.fn(() => null);
        const FieldComponent = withField(mockedComponent);
        render(
            <div data-test-id="wrapper-test">
                <FieldComponent name="test" />
            </div>,
        );
        await waitFor(() => expect(mockedComponent).not.toBeCalled());
    });

    it('should inject WithFieldProps', async () => {
        const fieldStateMock = buildMockFieldState();
        const {serviceFactoryMock, dispatchMock} = setupHooks({field: fieldStateMock});
        serviceFactoryMock.setup(sf => sf.createChangeHandler).returns(() => jest.fn());

        const mockedComponent = jest.fn(() => <div />);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name="test" initialValue="ali" />);
        await waitFor(() => expect(mockedComponent).toBeCalled());
        const injectedProps: WithFieldProps = {
            handleChange: expect.anything(),
            field: fieldStateMock,
            dispatch: dispatchMock,
        };

        await waitFor(() =>
            expect(mockedComponent).toBeCalledWith(expect.objectContaining(injectedProps), expect.anything()),
        );
        await waitFor(() =>
            expect(mockedComponent).toBeCalledWith(
                expect.objectContaining({
                    name: 'test',
                    initialValue: 'ali',
                }),
                expect.anything(),
            ),
        );
    });

    it('should not render when hidden', async () => {
        const {serviceFactoryMock} = setupHooks({fieldConfiguration: {hidden: true}});
        serviceFactoryMock.setup(sf => sf.createChangeHandler).returns(() => jest.fn());
        const mockedComponent = jest.fn(() => <div />);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name="test" initialValue="ali" />);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
    });

    it('should inject onChange', async () => {
        const {serviceFactoryMock} = setupHooks({field: buildMockFieldState()});
        const changeHandlerMock = TypeMoq.Mock.ofType<ChangeHandler>();
        changeHandlerMock.setup(h => h.handle(TypeMoq.It.isAny()));
        serviceFactoryMock
            .setup(sf => sf.createChangeHandler(TypeMoq.It.isValue('test'), TypeMoq.It.isAny()))
            .returns(() => changeHandlerMock.object);

        const mockedComponent = jest.fn(({handleChange}: WithFieldProps) => {
            handleChange(undefined);
            changeHandlerMock.verify(h => h.handle(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.once());
            return null;
        });
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name="test" initialValue="ali" />);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
    });

    it('should initialize fields', async () => {
        const {serviceFactoryMock, dispatchMock} = setupHooks({});
        serviceFactoryMock.setup(sf => sf.createChangeHandler).returns(() => jest.fn());
        const mockedComponent = jest.fn(() => null);
        const FieldComponent = withField(mockedComponent);
        render(<FieldComponent name="test" initialValue="ali" />);
        await waitFor(() => expect(mockedComponent).not.toBeCalledWith());
        expect(dispatchMock).toBeCalled();
    });
});
