import React, {useContext} from "react";
import {ServiceFactory} from "../../Services/ServiceFactory/ServiceFactory";
import {render, waitFor} from "@testing-library/react";
import {Form} from "../../Form/Form";
import {DispatchContext} from "../../Form/DispatchContext";
import {RootStateContext} from "../../Form/RootStateContext";
import {FieldsContext} from "../../Field/FieldsContext";
import {ServiceContext} from "../../Services/ServiceContext";
import Enzyme, {mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({adapter: new Adapter()})

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useReducer: jest.fn(),
    useMemo: jest.fn()
}));


describe('FormTest', () => {


    function setupMock(mockState: any = {
        fields: {},
        form: {}
    }, mockDispatch: any = jest.fn(), mockReducer: any = jest.fn(), mockServiceFactory: any = jest.fn()) {
        jest.spyOn(React, "useMemo")
            .mockReturnValueOnce(mockReducer)
            .mockReturnValueOnce(mockServiceFactory);
        jest.spyOn(React, "useReducer")
            .mockReturnValue([mockState, mockDispatch]);
    }

    it('should render children', async function () {
        setupMock();
        const component = render(<Form>
            <div data-testid={"fields"}>
            </div>
        </Form>);

        const fieldsDiv = await waitFor(async () => component.findByTestId('fields'));
        expect(fieldsDiv).not.toEqual(null);
    });


    it('should wrap elements with main context providers', async function () {
        const mockReducer = jest.fn();
        const mockServiceFactory: ServiceFactory = {} as any;
        const mockDispatch = jest.fn();
        const mockState = {fields: {username: {value: 'ali'}}};
        setupMock(mockState, mockDispatch, mockReducer, mockServiceFactory);

        const DummyComponent = () => {
            const dispatch = useContext(DispatchContext);
            const rootState = useContext(RootStateContext);
            const serviceFactory = useContext(ServiceContext);
            const fieldStates = useContext(FieldsContext);

            expect(rootState).toEqual(mockState);
            expect(dispatch).toEqual(mockDispatch);
            expect(serviceFactory).toEqual(mockServiceFactory);
            expect(fieldStates).toEqual(mockState.fields);

            return null;
        }

        mount(<Form><DummyComponent/></Form>);
    });
});