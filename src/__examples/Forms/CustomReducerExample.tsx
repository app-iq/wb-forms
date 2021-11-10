import {useCallback, useState} from "react";
import {DispatchFunction} from "../../Form/DispatchContext";
import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {RootReducer} from "../../Data/Reducer/RootReducer";
import {Action} from "../../Data/Actions/Action";
import {FieldsState} from "../../Data/Types/RootState";

const myCustomReducer: RootReducer<Action<any, any>> = (state, action) => {
    if (action.type === "PREFIX_VALUE") {
        const fieldNames = Object.keys(state.fields);
        return {
            ...state, fields: fieldNames.reduce((acc, fieldName) => {
                let field = state.fields[fieldName];
                acc[fieldName] = {...field , value : action.payload + " " + field.value};
                return acc;
            }, {} as FieldsState)
        }
    }

    return state;
}

const prefixAction = (value : string) : Action<any, any> => {
    return {
        type : 'PREFIX_VALUE',
        payload : value
    };
}

export function CustomReducerExample() {
    const [dispatch, setDispatch] = useState<DispatchFunction | undefined>();
    const getDispatchCallback = useCallback(d => setDispatch(() => d), []);
    return <Form getDispatch={getDispatchCallback} reducers={[myCustomReducer]}>
        <h1>Custom Reducer Example</h1>
        <hr/>

        <TextField name={'value 1'}/>
        <TextField name={'value 2'}/>

        <button onClick={e => {
            e.preventDefault();
            dispatch?.(prefixAction("CUSTOM_REDUCER"))
        }}>
            PREFIX
        </button>
    </Form>
}