---
sidebar_position: 3
---


# State

one of responsibilities of this library is to manage the state of the form, you don't need to do anything all things are already managed for you.

you still can extend the behavior of the state management by attaching your own reducers, before showing you how to do that, lets take a look on the schema of the state.

## State Schema

    {
        form: {
            loading: boolean;
            error?: unknown;
            response?: unknown;

            // you can extend the state further by attaching your own properties to the state
            [propertyName: string]: unknown;
        }
        fields: {
            value: any;
            valid: boolean;
            ready: boolean;

            // you can extend the state further by attaching your own properties to the state
            [propertyName: string]: unknown;
        }
    }

## Custom Reducers

to define your own custom reducer you need to create a new function:

    import {Action, Reducer} from 'wb-core-provider';

    type TActionType = 'CUSTOM_ACTION_1' | 'CUSTOM_ACTION_2';
    type TPayload = any;
    
    const myCustomReducer: Reducer<State, Action<TActionType, TPayload>> = (state, action) => {
        switch(action.type) {
            case 'CUSTOM_ACTION_1': ...;
            case 'CUSTOM_ACTION_2': ...;
            default: return state;
        }
    };

> **_NOTE:_**  the reducer should always return new state object.

then you need to inject this reducer via the props of the `Form` component

    <Form reducers={[myCustomReducer]}>
        ...
    </Form>

### Dispatch Actions

you can also dispatch action, to do that you can use `useDispatch` hook, keep in mind that you need to make sure that `useDispatch` is used within component that wrapped inside `Form` component.

    import {Action, Reducer, useDispatch} from 'wb-core-provider';

    const myCustomAction = (): Action<any,any> => {
        return {
            type: 'CUSTOM_ACTION_1',
            payload: 'dummy payload'
        };
    }

    function FooComponent() {
        const dispatch = useDispatch();
        return <button onClick={() => dispatch(myCustomAction())}>
            Dispatch My Custom Action
        </button>
    }

    <Form reducers={[myCustomReducer]}>
        <FooComponent />
        ...
    </Form>

### useState
TODO: 