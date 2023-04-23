import React from 'react';
import {Form} from '../../Form/Form';
import TextField from '../../DefaultComponents/TextField';
import {PasswordField} from '../../DefaultComponents/PasswordField';
import {SubmitButton} from '../../DefaultComponents/SubmitButton';
import {DefaultHttpSubmitOptions} from '../../Services/DefaultImplementation/DefaultHttpSubmitService';
import { ArrayTextField } from '../../DefaultComponents/ArrayField';

export function RegisterForm() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:5050/register'
    };
    return <Form fieldConfiguration={{
        username: { validateOnChange: false, validationRules: '^[a-z]+$' },
        password: { validateOnChange: false, validationRules: '^\\d{3,30}$' },
        email: { validateOnChange: false, validationRules: '^[a-z]+@[a-z]+\\.[a-z]+$' },
        birthDate: { validateOnChange: false, validationRules: '^\\d{4}-\\d{2}-\\d{2}$' },
        favorites: { validateOnChange: false, validationRules: '^\\d{3,30}$' },
    }} serviceOptions={{submit: submitOptions}}>
        <h1>Register Form Example</h1>
        <hr/>

        <TextField name={'username'}/>
        <TextField name={'name'} initialValue={'Test Name'}/>
        <TextField name={'email'}/>
        <TextField name={'birthDate'} inputProps={{type: 'date'}}/>
        <PasswordField name={'password'}/>

        <ArrayTextField name='favorites' />

        <hr/>

        <SubmitButton title={'Login'}/>
    </Form>;
}
