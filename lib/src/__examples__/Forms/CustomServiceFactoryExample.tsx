import React, {useCallback} from 'react';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {DefaultServiceFactory} from '../../Services/ServiceFactory/DefaultServiceFactory';
import {FieldValidator} from '../../Services/Protocol/FieldValidator';
import {FieldValue, State} from '../../Data/State';
import {FormProps} from '../../Form/FormProps';
import {DispatchFunction} from 'wb-core-provider';

class CustomValidator implements FieldValidator {
    validate(value: FieldValue): boolean {
        return value === 'wbox';
    }
}

class MyCustomServiceFactory extends DefaultServiceFactory {
    createFieldValidator(): FieldValidator {
        return new CustomValidator();
    }
}

export function CustomServiceFactoryExample() {
    const serviceFactoryCallback = useCallback((dispatch: DispatchFunction, state: State, props: FormProps) => new MyCustomServiceFactory(state, dispatch, props), []);
    return <Form serviceProvider={serviceFactoryCallback} fieldConfiguration={{
        'value 1': {validationRules: true},
        'value 2': {validationRules: true}
    }}>
        <h1>Custom Service Factory Example</h1>
        <hr/>
        <p>only the value <b>wbox</b> is valid</p>
        <TextField name={'value 1'}/>
        <TextField name={'value 2'}/>
    </Form>;
}
