import {useField} from "./Hooks";
import React, {useContext, useEffect} from "react";
import {DispatchContext} from "../Root/DispatchContext";
import {FieldProps} from "./FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {useServiceFactory} from "../Services/Hooks";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {buildFieldWithInitialState} from "./Helpers";
import {useDefaults} from "../Defaults/DefaultsContext";
import {FieldActions} from "../Data/Actions/Field/FieldActions";

export interface WithFieldProps {
    handleChange: (e: any) => void;
    field: FieldState;
    dispatch: any;
}

export function withField(Component: any) {
    return function Wrapper(props: FieldProps) {
        const name = props.name;
        const field = useField(name);
        const dispatch = useContext(DispatchContext);
        const serviceFactory = useServiceFactory();
        const defaults = useDefaults();
        const changeHandler = serviceFactory.createChangeHandler(name);
        let isNotInitializedYet = field === undefined;

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(SetupActions.initializeField(props.name, buildFieldWithInitialState(props, defaults)));
            }
        });

        if (isNotInitializedYet) {
            return null;
        }

        if (field.hidden) {
            return <React.Fragment/>
        }

        let onChange: any = (e: any) => changeHandler.handle(e);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };

        return <Component name={name} {...toInjectProps}/>
    }
}
