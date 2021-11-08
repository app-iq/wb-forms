import {useField} from "./Hooks";
import React, {useContext, useEffect} from "react";
import {DispatchContext} from "../Form/DispatchContext";
import {FieldProps} from "./FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {useServiceFactory} from "../Services/ServiceFactory/Hooks";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {defaultInitializeFunc, FieldInitializeFunc} from "./Helpers";
import {useDefaults} from "../Defaults/Hooks";

export interface WithFieldProps {
    handleChange: (e: any) => void;
    field: FieldState;
    dispatch: any;
}


export function HOCs(Component: any, initializeFieldFunc: FieldInitializeFunc = defaultInitializeFunc, defaultProps: Partial<FieldProps> = {}) {
    return function Wrapper(props: FieldProps) {
        props = {...props, ...defaultProps};
        const name = props.name;
        const field = useField(name);
        const dispatch = useContext(DispatchContext);
        const serviceFactory = useServiceFactory();
        const defaults = useDefaults();
        const changeHandler = serviceFactory.createChangeHandler(name);
        let isNotInitializedYet = field === undefined;

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(SetupActions.initializeField(props.name, initializeFieldFunc(props, defaults)));
            }
        }, [dispatch, defaults, isNotInitializedYet, props]);

        useEffect(() => {
            if (!isNotInitializedYet) {
                const updater = serviceFactory.createStateUpdater();
                updater.update(field, props);
            }
        }, [props, serviceFactory, field, isNotInitializedYet])

        if (isNotInitializedYet) {
            return null;
        }

        if (field.hidden) {
            return <React.Fragment/>
        }

        let onChange: any = (e: any) => changeHandler.handle(e, props.onValueChange);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };

        return <Component {...props} {...toInjectProps} />
    }
}
