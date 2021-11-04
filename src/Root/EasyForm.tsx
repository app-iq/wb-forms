import React, {useEffect, useMemo, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/Reducer/EasyFormReducer";
import {DispatchContext} from "./DispatchContext";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {EasyFormProps} from "./EasyFormProps";
import {useDefaults} from "../Defaults/DefaultsContext";
import {buildFieldWithInitialState} from "../Field/Helpers";
import {StateContext} from "./StateContext";
import {ServiceContext} from "../Services/ServiceContext";
import {DefaultServiceFactory} from "../Services/Services";
import {FieldsContext} from "../Field/FieldsContext";

export function EasyForm(props: EasyFormProps) {
    const {children} = props;
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    const sf = useMemo(() => {
        return props.serviceFactoryCallback ?
            props.serviceFactoryCallback(dispatch, state, props) :
            new DefaultServiceFactory(state, dispatch, props)
    }, [state, dispatch, props]);


    return <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
            <ServiceContext.Provider value={sf}>
                <FieldsContext.Provider value={state.fields}>
                    {children}
                </FieldsContext.Provider>
            </ServiceContext.Provider>
        </StateContext.Provider>
    </DispatchContext.Provider>
}