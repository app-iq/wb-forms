import React, {useEffect, useMemo, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/Reducer/EasyFormReducer";
import {DispatchContext} from "./DispatchContext";
import {EasyFormProps} from "./EasyFormProps";
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

    const getDispatch = props.getDispatch;
    const getState = props.getState;
    useEffect(() => {
        getDispatch?.(dispatch);
    }, [getDispatch, dispatch]);
    useEffect(() => {
        getState?.(state);
    }, [getState, state]);

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