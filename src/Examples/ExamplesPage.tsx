import React from 'react';
import {Form} from '../Form/Form';
import RadioButton from '../DefaultComponents/RadioButton';
import {LoginForm} from './Forms/LoginForm';
import {RegisterForm} from './Forms/RegisterForm';
import {FormFactoryExample} from './Forms/FormFactoryExample';
import {DefaultsExample} from './Forms/DefaultsExample';
import {CustomReducerExample} from './Forms/CustomReducerExample';
import {CustomServiceFactoryExample} from './Forms/CustomServiceFactoryExample';
import {useField} from '../Field/Hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: any = {
    'Login Form': LoginForm,
    'Register Form': RegisterForm,
    'Form Factory': FormFactoryExample,
    'Defaults Provider': DefaultsExample,
    'Custom Reducer': CustomReducerExample,
    'Custom Service Factory': CustomServiceFactoryExample,
};

const optionsKeys = Object.keys(options);

export function SimpleExample() {
    return <div>
        <h1>Select Example</h1>
        <Form>
            <RadioButton name={'example'} options={optionsKeys}/>
            <hr/>
            <ExampleView/>
        </Form>
    </div>;

}


function ExampleView() {
    const field = useField('example');
    if (!field) {
        console.log('example field not initialized yet');
        return null;
    }
    const ViewComponent = options[field.value] ?? React.Fragment;
    return <div style={{border: '1px solid #EEE', padding: 16, borderRadius: 5, marginTop: 24, background: '#EEE'}}>
        <ViewComponent/>
    </div>;
}
