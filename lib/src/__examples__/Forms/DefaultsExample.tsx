import React from 'react';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {Defaults, DefaultsProvider} from '../../Defaults/DefaultsContext';

export function DefaultsExample() {
    const defaults: Defaults = {
        valueSelector: e => e.target.value,
        clearValue: '----',
        fieldValue: 'DEFAULT VALUE'
    };
    return <DefaultsProvider value={defaults}>
        <Form>
            <h1>DefaultsProvider Example</h1>
            <hr/>

            <TextField name={'value 1'}/>
            <TextField name={'value 2'}/>

            <button>CLEAR(TODO: set onClick)</button>
        </Form>
    </DefaultsProvider>;
}
