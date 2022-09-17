import {useDispatch, useState} from '../../Form/Hooks';
import React from 'react';

describe('Hooks', () => {

    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useContext: jest.fn()
    }));

    it('should return root state | useRootState', function () {
        const mockedRootState = {fields: {username: {value: 'ali'}}};
        jest.spyOn(React, 'useContext')
            .mockReturnValueOnce(mockedRootState);
        const rootState = useState();
        expect(rootState).toEqual(mockedRootState);
    });


    it('should return dispatch | useDispatch', function () {
        const mockedDispatch = jest.fn();
        jest.spyOn(React, 'useContext')
            .mockReturnValueOnce(mockedDispatch);
        const rootState = useDispatch();
        expect(rootState).toEqual(mockedDispatch);
    });
});
