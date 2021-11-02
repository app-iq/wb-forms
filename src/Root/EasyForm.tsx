import React, {ReactElement, useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/EasyFormReducerFunction";
import {SetupActions} from "../Actions/SetupAction";
import {FieldsContext} from "../Context/FieldsContext";
import {DispatchContext} from "../Context/DispatchContext";
import {ServiceContext} from "../Context/ServiceContext";
import {defaultServices} from "../Services/DefaultServices";
import {FieldProps} from "../Field/FieldProps";
import {Field} from "../Field/Field";
import {easyFormDefaults, EasyFormDefaults} from "../Defaults/EasyFormDefaults";

export function EasyForm({children}: { children: ReactElement[] | ReactElement }) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];
        //TODO : make easyFormDefaults injectable
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name, buildField(c.props, easyFormDefaults))));
    }, [children]);

    //TODO : setup services from props
    let services = defaultServices;

    const fieldsRenderService = services.fieldsRenderService;

    return <ServiceContext.Provider value={services}>
        <DispatchContext.Provider value={dispatch}>
            <FieldsContext.Provider value={state.fields}>
                {
                    fieldsRenderService.render(children)
                }
            </FieldsContext.Provider>
        </DispatchContext.Provider>
    </ServiceContext.Provider>
}


function buildField(props: FieldProps, defaults: EasyFormDefaults): Field {
    return {
        name: props.name,
        valueSelector: props.valueSelector ?? defaults.valueSelector,
        value: props.initialValue ?? defaults.fieldValue
    }
}