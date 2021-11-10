import React, {useState} from "react";
import {Form} from "../Form/Form";
import RadioButton from "./Components/RadioButton";
import {LoginForm} from "./Forms/LoginForm";
import {RegisterForm} from "./Forms/RegisterForm";
import {FormFactoryExample} from "./Forms/FormFactoryExample";
import {DefaultsExample} from "./Forms/DefaultsExample";
import {StateAndDispatchExample} from "./Forms/StateAndDispatchExample";
import {CustomReducerExample} from "./Forms/CustomReducerExample";
import {CustomServiceFactoryExample} from "./Forms/CustomServiceFactoryExample";

const options: any = {
    login: LoginForm,
    register: RegisterForm,
    formFactory: FormFactoryExample,
    defaultsProvider: DefaultsExample,
    getStateAndGetDispatch: StateAndDispatchExample,
    customReducer: CustomReducerExample,
    customServiceFactory: CustomServiceFactoryExample,
};

const titles: any = {
    login: 'Login',
    register: 'Register',
    formFactory: 'Form Factory',
    defaultsProvider: 'Defaults Provider',
    getStateAndGetDispatch: 'getState,getDispatch',
    customReducer: 'getState,getDispatch',

}
const optionsKeys = Object.keys(options);

export function SimpleExample() {
    const [selectedExample, setExample] = useState<string | undefined>(undefined);
    return <div>
        <h1>Select Example</h1>

        <Form>
            <RadioButton name={'example'} options={optionsKeys} onValueChange={v => setExample(v)}/>
        </Form>

        <ExampleView example={selectedExample}/>

    </div>

}


function ExampleView({example}: { example: string | undefined }) {
    let ViewComponent: any = (example && options[example]) ?? React.Fragment;
    return <div style={{border: '1px solid #EEE', padding: 16, borderRadius: 5, marginTop: 24, background: '#EEE'}}>
        <ViewComponent/>
    </div>;
}