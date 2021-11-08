import {render, waitFor} from "@testing-library/react";
import * as Hooks from "../../Defaults/Hooks";
import {Defaults} from "../../Defaults/FormDefaults";
import {withDefaults, WithDefaultsProps} from "../../Defaults/HOCs";

const spy = jest.spyOn(Hooks, 'useDefaults');

describe('Defaults HOCs', () => {


    describe('useDefaults', () => {

        it('should inject defaults to the passed component', async () => {
            const mockDefaults: Defaults = {valueSelector: e => e, clearValue: '-', fieldValue: ''};
            spy.mockReturnValue(mockDefaults);
            const mockedComponent = jest.fn(() => <div/>);
            const DummyComponent = withDefaults(mockedComponent);
            render(<DummyComponent test={'value'}/>);
            await waitFor(() => expect(mockedComponent).toBeCalled());
            const injectedProps: WithDefaultsProps = {
                defaults: mockDefaults
            };
            await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining(injectedProps), expect.anything()));
            await waitFor(() => expect(mockedComponent).toBeCalledWith(expect.objectContaining({test: 'value'}), expect.anything()));
        });


        it('should parent component props with name defaults', async () => {
            const mockDefaults: Defaults = {valueSelector: e => e, clearValue: '-', fieldValue: ''};
            spy.mockReturnValue(mockDefaults);
            const mockedComponent = jest.fn(() => <div/>);
            const DummyComponent = withDefaults(mockedComponent);
            render(<DummyComponent defaults={'value'}/>);
            await waitFor(() => expect(mockedComponent).toBeCalled());
            await waitFor(() => expect(mockedComponent).not.toBeCalledWith(expect.objectContaining({defaults: 'value'}), expect.anything()));
        });

    });

})