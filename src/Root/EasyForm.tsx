import React, {useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/Reducer/EasyFormReducer";
import {FieldsContext} from "../Field/FieldsContext";
import {DispatchContext} from "./DispatchContext";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {FieldsRenderService} from "../Services/Protocol/FieldsRenderService";
import {EasyFormProps} from "./EasyFormProps";
import {useDefaults} from "../Defaults/DefaultsContext";
import {buildFieldWithInitialState} from "../Field/Helpers";
import {useService} from "../Services/Hooks";

export function EasyForm({children}: EasyFormProps) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    const defaults = useDefaults();
    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name, buildFieldWithInitialState(c.props, defaults))));
    }, [children, defaults]);

    const fieldsRenderService = useService<FieldsRenderService>('fieldsRenderService')(dispatch);

    return <DispatchContext.Provider value={dispatch}>
        <FieldsContext.Provider value={state.fields}>
            {
                fieldsRenderService.render(children)
            }
        </FieldsContext.Provider>
    </DispatchContext.Provider>
}