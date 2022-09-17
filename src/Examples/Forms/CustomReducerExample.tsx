import React, {useCallback, useState} from 'react';
import {DispatchFunction} from '../../Form/DispatchContext';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {RootReducer} from '../../Data/RootReducer';
import {Action} from '../../Data/Action';
import {FieldsState} from '../../Data/State';

const myCustomReducer: RootReducer<Action<unknown, unknown>> = (state, action) => {
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
    const [dispatch, setDispatch] = useState<DispatchFunction | undefined>();
    const getDispatchCallback = useCallback((d: DispatchFunction) => setDispatch(() => d), []);
    return <Form getDispatch={getDispatchCallback} reducers={[myCustomReducer]}>
        <h1>Custom Reducer Example</h1>
        <hr/>

        <TextField name={'value 1'}/>
        <TextField name={'value 2'}/>

        <button onClick={e => {
            e.preventDefault();
            dispatch?.(prefixAction('CUSTOM_REDUCER'));
        }}>
            PREFIX
        </button>
    </Form>;
}
