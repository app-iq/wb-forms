import React, {useCallback, useState} from 'react';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {FormActions} from '../../Data/Form/FormActions';
import {DispatchFunction} from '../../Form/DispatchContext';
import {State} from '../../Data/State';

export function StateAndDispatchExample() {
    const [rootState, setRootState] = useState<State | undefined>();
    const [dispatch, setDispatch] = useState<DispatchFunction | undefined>();
    const getStateCallback = useCallback((s: State) => setRootState(s), []);
    const getDispatchCallback = useCallback((d: DispatchFunction) => setDispatch(() => d), []);
    return <Form getDispatch={getDispatchCallback} getState={getStateCallback}>
        <h1>getState,getDispatch Example</h1>
        <hr/>

        <TextField name={'value 1'}/>
        <TextField name={'value 2'}/>

        <button onClick={e => {
            e.preventDefault();
            dispatch?.(FormActions.clearValues());
        }}>CLEAR
        </button>
        <button onClick={e => {
            e.preventDefault();
            console.log(rootState);
        }}>PRINT STATE
        </button>
    </Form>;

}
