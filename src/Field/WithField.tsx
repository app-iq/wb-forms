import {useField} from "./Hooks";
import React, {useContext} from "react";
import {DispatchContext} from "../Root/DispatchContext";
import {FieldProps} from "./FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {FieldValidator} from "../Services/Protocol/FieldValidator";
import {ChangeHandler, ChangeHandlerCallbackOptions} from "../Services/Protocol/ChangeHandler";
import {useFieldService} from "../Services/Hooks";

export interface WithFieldProps {
    handleChange: (e: any) => void;
    field: FieldState;
    dispatch: any;
}

export function withField(Component: any) {
    return function Wrapper({name, ...otherProps}: FieldProps) {
        const field = useField(name);
        const dispatch = useContext(DispatchContext);
        const fieldValidator = useFieldService<FieldValidator>('fieldValidator')(dispatch);
        const changeHandler = useFieldService<ChangeHandler, ChangeHandlerCallbackOptions>('changeHandler', field);

        let isNotInitializedYet = field === undefined;
        if (isNotInitializedYet) {
            return null;
        }

        if (field.hidden) {
            return <React.Fragment/>
        }

        let onChange: any = (e: any) => changeHandler(dispatch, {state: field, validator: fieldValidator}).handle(e);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };

        return <Component name={name} {...otherProps} {...toInjectProps}/>
    }
}