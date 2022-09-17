import React, {PropsWithChildren, useEffect, useMemo, useReducer} from 'react';
import {buildRootReducer, initialState} from '../Data/RootReducer';
import {DispatchContext} from './DispatchContext';
import {FormProps} from './FormProps';
import {StateContext} from './StateContext';
import {ServiceContext} from '../Services/ServiceContext';
import {DefaultServiceFactory} from '../Services/ServiceFactory/DefaultServiceFactory';
import {FieldConfigurationProvider} from '../Field/FieldConfigurationContext';

export const Form: React.FC<PropsWithChildren<FormProps>> = (props) => {
    const {children} = props;
    const reducer = useMemo(() => buildRootReducer(props.reducers ?? []), [props.reducers]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const sf = useMemo(() => {
        return props.serviceFactoryCallback ?
            props.serviceFactoryCallback(dispatch, state, props) :
            new DefaultServiceFactory(state, dispatch, props);
    }, [state, dispatch, props]);

    const getDispatch = props.getDispatch;
    const getState = props.getState;
    useEffect(() => getDispatch?.(dispatch), [getDispatch, dispatch]);
    useEffect(() => getState?.(state), [getState, state]);

    return <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
            <ServiceContext.Provider value={sf}>
                <FieldConfigurationProvider value={props.fieldConfiguration ?? {}}>
                    {children}
                </FieldConfigurationProvider>
            </ServiceContext.Provider>
        </StateContext.Provider>
    </DispatchContext.Provider>;
};
