import React, {useEffect, useMemo, useReducer} from "react";
import {buildRootReducer, rootReducerInitialState} from "../Data/Reducer/RootReducer";
import {DispatchContext} from "./DispatchContext";
import {EasyFormProps} from "./EasyFormProps";
import {RootStateContext} from "./RootStateContext";
import {ServiceContext} from "../Services/ServiceContext";
import {DefaultServiceFactory} from "../Services/ServiceFactory";
import {FieldsContext} from "../Field/FieldsContext";

export function EasyForm(props: EasyFormProps) {
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