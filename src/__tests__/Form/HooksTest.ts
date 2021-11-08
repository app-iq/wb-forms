import {useRootState} from "../../Form/Hooks";
import React from "react";

describe('Hooks', () => {

    jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useContext: jest.fn()
    }));

    it('should return root state | useRootState', function () {
        const mockedRootState = {fields: {username: {value: 'ali'}}};
        jest.spyOn(React, "useContext")
            .mockReturnValueOnce(mockedRootState);
        const rootState = useRootState();
        expect(rootState).toEqual(mockedRootState);
    });
});