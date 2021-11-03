import {useField} from "./Hooks";
import {useContext} from "react";
import {DispatchContext} from "../Context/DispatchContext";
import {FieldProps} from "./FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {FieldActions} from "../Data/Actions/Field/FieldActions";

export interface WithFieldProps {
    handleChange: (e: any) => void;
    field: FieldState;
    dispatch: any;
}

export function withField(Component: any) {
    return function Wrapper({name, ...otherProps}: FieldProps) {
        const field = useField(name);
        const dispatch = useContext(DispatchContext);

        let isNotInitializedYet = field === undefined;
        if (isNotInitializedYet) {
            return null;
        }

        let onChange: any = (e: any) => dispatch(FieldActions.changeValue(name, field.valueSelector(e)));

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };

        return <Component name={name} {...otherProps} {...toInjectProps}/>
    }
}