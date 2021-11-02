import React, {useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/Reducer/EasyFormReducer";
import {FieldsContext} from "../Context/FieldsContext";
import {DispatchContext} from "../Context/DispatchContext";
import {useService} from "../Context/ServiceContext";
import {FieldProps} from "../Field/FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {easyFormDefaults, EasyFormDefaults} from "../Defaults/EasyFormDefaults";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {FieldsRenderService} from "../Services/Protocol/FieldsRenderService";
import {EasyFormProps} from "./EasyFormProps";

export function EasyForm({children}: EasyFormProps) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];
        //TODO : make easyFormDefaults injectable
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name, buildField(c.props, easyFormDefaults))));
    }, [children]);

    const fieldsRenderService = useService<FieldsRenderService>('fieldsRenderService')();

    return <DispatchContext.Provider value={dispatch}>
        <FieldsContext.Provider value={state.fields}>
            {
                fieldsRenderService.render(children)
            }
        </FieldsContext.Provider>
    </DispatchContext.Provider>

}


function buildField(props: FieldProps, defaults: EasyFormDefaults): FieldState {
    return {
        name: props.name,
        valueSelector: props.valueSelector ?? defaults.valueSelector,
        value: props.initialValue ?? defaults.fieldValue
    }
}