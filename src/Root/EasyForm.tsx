import React, {ReactElement, useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/EasyFormReducer";
import {SetupActions} from "../Actions/SetupAction";
import {FieldsContext} from "../Context/FieldsContext";
import {DispatchContext} from "../Context/DispatchContext";
import {ServiceContext} from "../Context/ServiceContext";
import {defaultServices} from "../Services/DefaultServices";

export function EasyForm({children}: { children: ReactElement[] | ReactElement }) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name)));
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



