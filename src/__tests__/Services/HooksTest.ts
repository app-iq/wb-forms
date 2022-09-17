import {useServiceFactory} from '../../Services/ServiceFactory/Hooks';
import React from 'react';

describe('ServiceFactoryHooks', () => {

    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useContext: jest.fn()
    }));

    it('should throw exception when service factory is nullable', function () {
        jest.spyOn(React, 'useContext')
            .mockReturnValueOnce(undefined);
        expect(() => useServiceFactory()).toThrowError('cannot resolve service factory');
    });

    it('should return service factory', function () {
        const mockedServiceFactory = {};
        jest.spyOn(React, 'useContext')
            .mockReturnValueOnce(mockedServiceFactory);
        const serviceFactory = useServiceFactory();
        expect(serviceFactory).toEqual(mockedServiceFactory);
    });


});