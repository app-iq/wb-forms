import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {PasswordField} from '../../DefaultComponents/PasswordField';
import {SubmitButton} from '../../DefaultComponents/SubmitButton';
import {DefaultHttpSubmitOptions} from '../../Services/DefaultImplementation/DefaultHttpSubmitService';
import React from 'react';

export function LoginForm() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:8080/login'
    };
    return <Form serviceOptions={{submit: submitOptions}}
                 fieldConfiguration={{
                     password: {
                         validationRules: '^\\d{3,30}$'
                     }
                 }}>
        <h1>Login Form Example</h1>
        <hr/>

        <TextField name={''}/>
        <PasswordField name={'password'}/>

        <hr/>

        <SubmitButton title={'Login'}/>
    </Form>;
}
