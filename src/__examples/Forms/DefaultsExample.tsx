import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {DefaultHttpSubmitOptions} from "../../Services/DefaultImplementation/DefaultHttpSubmitService";
import {DefaultsProvider} from "../../Defaults/DefaultsContext";
import {Button} from "../../Form/Button/Button";
import {FormActions} from "../../Data/Actions/Form/FormActions";

export function DefaultsExample() {
    const submitOptions: DefaultHttpSubmitOptions = {
        url: 'http://localhost:8080/login'
    };
    return <DefaultsProvider value={{
        valueSelector: e => e.target.value,
        clearValue: '----',
        fieldValue: 'DEFAULT VALUE'
    }}>
        <Form serviceOptions={{submit: submitOptions}}>
            <h1>DefaultsProvider Example</h1>
            <hr/>

            <TextField name={'value 1'}/>
            <TextField name={'value 2'}/>

            <Button render={(_, dispatch) => <button onClick={(e) => {
                e.preventDefault();
                dispatch(FormActions.clearValues());
            }}>CLEAR</button>}/>
        </Form>
    </DefaultsProvider>
}