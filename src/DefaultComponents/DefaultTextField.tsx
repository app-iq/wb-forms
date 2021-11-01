import {FieldProps} from "../Field/FieldProps";
import {useField} from "../Field/Hooks";
import {StateActions} from "../Actions/StateAction";
import {useContext} from "react";
import {DispatchContext} from "../Context/DispatchContext";

export function DefaultTextField({name}: FieldProps) {
    const field = useField(name);
    const dispatch = useContext(DispatchContext);
    if (field === undefined) {
        console.log('field not initialized yet');
        return null;
    }
    return <input name={name} placeholder={name} value={field.state.value}
                  onChange={e => dispatch(StateActions.changeValue(name , e.target.value))}/>
}