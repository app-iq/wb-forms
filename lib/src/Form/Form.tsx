import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { FormProps } from './FormProps';
import { DefaultServiceFactory } from '../Services/ServiceFactory/DefaultServiceFactory';
import { CoreProvider, DispatchFunction } from 'wb-core-provider';
import { INITIAL_STATE, State } from '../Data/State';
import { setupReducer } from '../Data/Setup/SetupReducer';
import { fieldReducer } from '../Data/Field/FieldReducer';
import { submitReducer } from '../Data/Form/SubmitReducer';
import { formReducer } from '../Data/Form/FormReducer';
import { FieldConfigurationContext } from '../Field/FieldConfigurationContext';

const baseReducers = [setupReducer, fieldReducer, submitReducer, formReducer];

export const Form: React.FC<PropsWithChildren<FormProps>> = props => {
    const { children } = props;
    const reducers = useMemo(() => baseReducers.concat(props.reducers ?? []), [props.reducers]);
    const createServiceFactory = useCallback(
        (dispatch: DispatchFunction, state: unknown) => {
            return props.serviceProvider
                ? props.serviceProvider(dispatch, state as State, props)
                : new DefaultServiceFactory(state as State, dispatch, props);
        },
        [props.serviceProvider]
    );

    return (
        <CoreProvider createServiceFactory={createServiceFactory} reducers={reducers} initialState={INITIAL_STATE}>
            <FieldConfigurationContext.Provider value={props.fieldConfiguration ?? {}}>
                {children}
            </FieldConfigurationContext.Provider>
        </CoreProvider>
    );
};
