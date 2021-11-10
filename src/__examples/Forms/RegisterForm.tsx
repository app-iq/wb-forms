import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {PasswordField} from "../Components/PasswordField";
import {SubmitButton} from "../Components/SubmitButton";
import {DefaultHttpSubmitOptions} from "../../Services/DefaultImplementation/DefaultHttpSubmitService";

export function RegisterForm() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:8080/register'
    };
    return <Form serviceOptions={{submit: submitOptions}}>
        <h1>Register Form Example</h1>
        <hr/>

        <TextField name={'username'}/>
        <TextField name={'name'} initialValue={'Test Name'}/>
        <TextField name={'email'} />
        <TextField name={'birthDate'} inputProps={{type: 'date'}}/>
        <PasswordField name={'password'}/>

        <hr/>

        <SubmitButton title={'Login'} validateBeforeSubmit={true}/>
    </Form>
}