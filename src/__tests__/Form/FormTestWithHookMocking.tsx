import React, {useContext} from "react";
import {ServiceContext} from "../../Services/ServiceContext";
import Enzyme, {mount} from "enzyme";
import {Form} from "../../Form/Form";
import {DefaultServiceFactory} from "../../Services/ServiceFactory/DefaultServiceFactory";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({adapter: new Adapter()})

describe('FormTest-WithoutMock', () => {
    it('should use passed service factory', async function () {
        const mockServiceFactory = {};
        const DummyComponent = () => {
            const serviceFactory = useContext(ServiceContext);
            expect(serviceFactory).toEqual(mockServiceFactory);
            return null;
        }
        mount(<Form serviceFactoryCallback={jest.fn().mockReturnValue(mockServiceFactory)}><DummyComponent/></Form>);
    });

    it('should use default service factory', async function () {
        const DummyComponent = () => {
            const serviceFactory = useContext(ServiceContext);
            expect(serviceFactory).toBeInstanceOf(DefaultServiceFactory);
            return null;
        }
        mount(<Form><DummyComponent/></Form>);
    });

    it('should call getDispatch,getState', async function () {
        const DummyComponent = () => {
            return null;
        }
        const mockGetDispatch = jest.fn();
        const mockGetState = jest.fn();
        mount(<Form getState={mockGetState} getDispatch={mockGetDispatch}><DummyComponent/></Form>);
        expect(mockGetDispatch).toBeCalled();
        expect(mockGetState).toBeCalled();
    });

})