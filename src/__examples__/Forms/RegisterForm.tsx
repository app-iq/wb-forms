import React from 'react';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {PasswordField} from '../../DefaultComponents/PasswordField';
import {SubmitButton} from '../../DefaultComponents/SubmitButton';
import {DefaultHttpSubmitOptions} from '../../Services/DefaultImplementation/DefaultHttpSubmitService';

export function RegisterForm() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:5050/register'
    };
    return <Form serviceOptions={{submit: submitOptions}}>
        <h1>Register Form Example</h1>
        <hr/>

        <TextField name={'username'}/>
        <TextField name={'name'} initialValue={'Test Name'}/>
        <TextField name={'email'}/>
        <TextField name={'birthDate'} inputProps={{type: 'date'}}/>
        <PasswordField name={'password'}/>

        <hr/>

        <SubmitButton title={'Login'}/>
    </Form>;
}
