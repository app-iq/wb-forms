import React, {useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/Reducer/EasyFormReducer";
import {FieldsContext} from "../Context/FieldsContext";
import {DispatchContext} from "../Context/DispatchContext";
import {useService} from "../Context/ServiceContext";
import {FieldProps} from "../Field/FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {Defaults} from "../Defaults/EasyFormDefaults";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {FieldsRenderService} from "../Services/Protocol/FieldsRenderService";
import {EasyFormProps} from "./EasyFormProps";
import {useDefaults} from "../Defaults/DefaultsContext";

export function EasyForm({children}: EasyFormProps) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    const defaults = useDefaults();
    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name, buildField(c.props, defaults))));
    }, [children, defaults]);

    const fieldsRenderService = useService<FieldsRenderService>('fieldsRenderService')();

    return <DispatchContext.Provider value={dispatch}>
        <FieldsContext.Provider value={state.fields}>
            {
                fieldsRenderService.render(children)
            }
        </FieldsContext.Provider>
    </DispatchContext.Provider>
}


function buildField(props: FieldProps, defaults: Defaults): FieldState {
    return {
        name: props.name,
        valueSelector: props.valueSelector ?? defaults.valueSelector,
        value: props.initialValue ?? defaults.fieldValue
    }
}