import React, {useEffect, useMemo, useReducer} from "react";
import {buildRootReducer, rootReducerInitialState} from "../Data/Reducer/RootReducer";
import {DispatchContext} from "./DispatchContext";
import {FormProps} from "./FormProps";
import {RootStateContext} from "./RootStateContext";
import {ServiceContext} from "../Services/ServiceContext";
import {FieldsContext} from "../Field/FieldsContext";
import {DefaultServiceFactory} from "../Services/ServiceFactory/DefaultServiceFactory";

export function Form(props: FormProps) {
    const {children} = props;
    const reducer = useMemo(() => buildRootReducer(props.reducers ?? []), [props.reducers]);
    const [state, dispatch] = useReducer(reducer, rootReducerInitialState);
    const sf = useMemo(() => {
        return props.serviceFactoryCallback ?
            props.serviceFactoryCallback(dispatch, state, props) :
            new DefaultServiceFactory(state, dispatch, props)
    }, [state, dispatch, props]);

    const getDispatch = props.getDispatch;
    const getState = props.getState;
    useEffect(() => getDispatch?.(dispatch), [getDispatch, dispatch]);
    useEffect(() => getState?.(state), [getState, state]);

    return <DispatchContext.Provider value={dispatch}>
        <RootStateContext.Provider value={state}>
            <ServiceContext.Provider value={sf}>
                <FieldsContext.Provider value={state.fields}>
                    {children}
                </FieldsContext.Provider>
            </ServiceContext.Provider>
        </RootStateContext.Provider>
    </DispatchContext.Provider>
}