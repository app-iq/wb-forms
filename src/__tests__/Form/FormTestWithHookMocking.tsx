import React, {useContext} from 'react';
import {ServiceContext} from '../../Services/ServiceContext';
import {Form} from '../../Form/Form';
import {DefaultServiceFactory} from '../../Services/ServiceFactory/DefaultServiceFactory';
import {render} from '@testing-library/react';


describe('FormTest-WithoutMock', () => {
    it('should use passed service factory', async function () {
        const mockServiceFactory = {};
        const DummyComponent = () => {
            const serviceFactory = useContext(ServiceContext);
            expect(serviceFactory).toEqual(mockServiceFactory);
            return null;
        };
        await render(<Form
            serviceFactoryCallback={jest.fn().mockReturnValue(mockServiceFactory)}><DummyComponent/></Form>);
    });

    it('should use default service factory', async function () {
        const DummyComponent = () => {
            const serviceFactory = useContext(ServiceContext);
            expect(serviceFactory).toBeInstanceOf(DefaultServiceFactory);
            return null;
        };
        await render(<Form><DummyComponent/></Form>);
    });

    it('should call getDispatch,getState', async function () {
        const DummyComponent = () => {
            return null;
        };
        const mockGetDispatch = jest.fn();
        const mockGetState = jest.fn();
        await render(<Form getState={mockGetState} getDispatch={mockGetDispatch}><DummyComponent/></Form>);
        expect(mockGetDispatch).toBeCalled();
        expect(mockGetState).toBeCalled();
    });

});