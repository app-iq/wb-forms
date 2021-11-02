import {useField} from "./Hooks";
import {useContext} from "react";
import {DispatchContext} from "../Context/DispatchContext";
import {FieldProps} from "./FieldProps";
import {FieldState} from "./FieldState";
import {StateActions} from "../Actions/State/StateActions";

export interface WithFieldProps {
    handleChange: (e: any) => void;
    field: FieldState;
    dispatch: any;
}

export function withField(Component: any) {
    return function ({name}: FieldProps) {
        const field = useField(name);
        const dispatch = useContext(DispatchContext);
        if (field === undefined) {
            return null;
        }

        let onChange: any = (e: any) => dispatch(StateActions.changeValue(name, e.target.value));

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };
        return <Component {...toInjectProps}/>
    }
}