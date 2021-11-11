import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {DefaultsProvider} from "../../Defaults/DefaultsContext";
import {Button} from "../../Form/Button/Button";
import {FormActions} from "../../Data/Actions/Form/FormActions";
import {Defaults} from "../../Defaults/FormDefaults";

export function DefaultsExample() {
    let defaults: Defaults = {
        valueSelector: e => e.target.value,
        clearValue: '----',
        fieldValue: 'DEFAULT VALUE'
    };
    return <DefaultsProvider value={defaults}>
        <Form>
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