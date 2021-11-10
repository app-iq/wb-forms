import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {FormActions} from "../../Data/Actions/Form/FormActions";
import {useCallback, useState} from "react";
import {DispatchFunction} from "../../Form/DispatchContext";
import {RootState} from "../../Data/Types/RootState";

export function StateAndDispatchExample() {
    const [rootState , setRootState] = useState<RootState | undefined>();
    const [dispatch , setDispatch] = useState<DispatchFunction | undefined>();
    const getStateCallback = useCallback(s => setRootState(s) , []);
    const getDispatchCallback = useCallback(d => setDispatch(() => d) , []);
    return <Form getDispatch={getDispatchCallback} getState={getStateCallback}>
        <h1>getState,getDispatch Example</h1>
        <hr/>

        <TextField name={'value 1'}/>
        <TextField name={'value 2'}/>

        <button onClick={e => {e.preventDefault(); dispatch?.(FormActions.clearValues())}}>CLEAR</button>
        <button onClick={e => {e.preventDefault(); console.log(rootState)}}>PRINT STATE</button>
    </Form>

}