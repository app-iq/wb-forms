import React from 'react';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {FieldsState, State} from '../../Data/State';
import {Action, Reducer, useDispatch} from 'wb-core-provider';

const myCustomReducer: Reducer<State, Action<unknown, unknown>> = (state, action) => {
    if (action.type === 'PREFIX_VALUE') {
        const fieldNames = Object.keys(state.fields);
        return {
            ...state, fields: fieldNames.reduce((acc, fieldName) => {
                const field = state.fields[fieldName];
                acc[fieldName] = {...field, value: action.payload + ' ' + field.value};
                return acc;
            }, {} as FieldsState)
        };
    }

    return state;
};

const prefixAction = (value: string): Action<unknown, unknown> => {
    return {
        type: 'PREFIX_VALUE',
        payload: value
    };
};

export function CustomReducerExample() {
    return <Form reducers={[myCustomReducer]}>
        <h1>Custom Reducer Example</h1>
        <hr/>

        <TextField name={'value 1'}/>
        <TextField name={'value 2'}/>
        <Button />

    </Form>;
}

function Button() {
    const dispatch = useDispatch();
    return <button onClick={e => {
        e.preventDefault();
        dispatch?.(prefixAction('CUSTOM_REDUCER'));
    }}>
        PREFIX
    </button>;
}
