import { Form } from 'wb-forms';
import { DefaultHttpSubmitOptions } from 'wb-forms/build/Services/DefaultImplementation/DefaultHttpSubmitService';
import { PasswordField } from '../../Components/PasswordField';
import { SubmitButton } from '../../Components/SubmitButton';
import { TextField } from '../../Components/TextField';

export function LoginForm() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:5050/login'
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
