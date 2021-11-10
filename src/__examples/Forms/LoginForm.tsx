import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {PasswordField} from "../Components/PasswordField";
import {SubmitButton} from "../Components/SubmitButton";
import {DefaultHttpSubmitOptions} from "../../Services/DefaultImplementation/DefaultHttpSubmitService";

export function LoginForm() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:8080/login'
    };
    return <Form serviceOptions={{submit : submitOptions}}>
        <h1>Login Form Example</h1>
        <hr/>

        <TextField name={'username'} validationRules={'^.{3,30}$'}/>
        <PasswordField name={'password'} validationRules={'^\\d{3,30}$'}/>

        <hr/>

        <SubmitButton title={'Login'} validateBeforeSubmit={true}/>
    </Form>
}