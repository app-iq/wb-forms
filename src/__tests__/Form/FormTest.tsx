import React, {Reducer, useContext} from 'react';
import {ServiceFactory} from '../../Services/ServiceFactory/ServiceFactory';
import {render, waitFor} from '@testing-library/react';
import {Form} from '../../Form/Form';
import {DispatchContext, DispatchFunction} from '../../Form/DispatchContext';
import {StateContext} from '../../Form/StateContext';
import {ServiceContext} from '../../Services/ServiceContext';
import {State} from '../../Data/State';
import {Action} from '../../Data/Action';
import * as TypeMoq from 'typemoq';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useReducer: jest.fn(),
    useMemo: jest.fn()
}));


describe('FormTest', () => {


    function setupMock(mockState: State = {
        fields: {},
        form: {loading: false}
    }, mockDispatch: DispatchFunction = jest.fn(), mockReducers: Reducer<State, Action<unknown, unknown>> = jest.fn(), mockServiceFactory: ServiceFactory = TypeMoq.Mock.ofType<ServiceFactory>().object) {
        jest.spyOn(React, 'useMemo')
            .mockReturnValueOnce(mockReducers)
            .mockReturnValueOnce(mockServiceFactory);
        jest.spyOn(React, 'useReducer')
            .mockReturnValue([mockState, mockDispatch]);
    }

    it('should render children', async function () {
        setupMock();
        const component = render(<Form>
            <div data-testid={'fields'}>
            </div>
        </Form>);

        const fieldsDiv = await waitFor(async () => component.findByTestId('fields'));
        expect(fieldsDiv).not.toEqual(null);
    });


    it('should wrap elements with main context providers', async function () {
        const mockReducer = jest.fn();
        const mockServiceFactory: ServiceFactory = TypeMoq.Mock.ofType<ServiceFactory>().object;
        const mockDispatch = jest.fn();
        const mockState: State = {fields: {username: {value: 'ali', valid: true}}, form: {loading: false}};
        setupMock(mockState, mockDispatch, mockReducer, mockServiceFactory);

        const DummyComponent = () => {
            const dispatch = useContext(DispatchContext);
            const rootState = useContext(StateContext);
            const serviceFactory = useContext(ServiceContext);

            expect(rootState).toEqual(mockState);
            expect(dispatch).toEqual(mockDispatch);
            expect(serviceFactory).toEqual(mockServiceFactory);

            return null;
        };

        await render(<Form><DummyComponent/></Form>);
    });
});
