import * as ServiceFactoryHooks from "../../Services/ServiceFactory/Hooks";
import * as FormHooks from "../../Form/Hooks";
import {withActionData, withRootState} from "../../Form/HOCs";
import {configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {render, waitFor} from "@testing-library/react";
import React from "react";

configure({adapter: new Adapter()});

const useServiceFactorySpy = jest.spyOn(ServiceFactoryHooks, 'useServiceFactory');
const useRootStateSpy = jest.spyOn(FormHooks, 'useRootState');
const useDispatchSpy = jest.spyOn(FormHooks, 'useDispatch');


describe('Form HOCs', () => {

    it('should inject WithActionDataProps and override actionData if passed from wrapper', async function () {
        let mockedServiceFactory = {} as any;
        let mockedDispatch = jest.fn();
        let mockedRootState = {fields: {}} as any;
        useServiceFactorySpy.mockReturnValue(mockedServiceFactory);
        useDispatchSpy.mockReturnValue(mockedDispatch);
        useRootStateSpy.mockReturnValue(mockedRootState);
        const mockedComponent = jest.fn(() => <div/>);
        const Component = withActionData(mockedComponent);
        render(<Component test={'value'} actionData={{}}/>);
        await waitFor(() => expect(mockedComponent).toBeCalled());
        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining({
                    actionData: {
                        rootState: mockedRootState,
                        dispatch: mockedDispatch,
                        serviceFactory: mockedServiceFactory,
                    },
                    test: 'value'
                }
            ), expect.anything())
        );
    });


    it('should inject root state and override rootState if passed from wrapper', async function () {
        let mockedRootState = {fields: {}} as any;
        useRootStateSpy.mockReturnValue(mockedRootState);
        const mockedComponent = jest.fn(() => <div/>);
        const Component = withRootState(mockedComponent);
        render(<Component test={'value'} rootState={{}}/>);
        await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining({
                    rootState: mockedRootState,
                    test: 'value'
                }
            ), expect.anything())
        );
    });

});