import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {CoreProvider, DispatchFunction} from 'wb-core-provider';
import {FormProps} from './FormProps';
import {DefaultServiceFactory} from '../Services/ServiceFactory/DefaultServiceFactory';
import {INITIAL_STATE, State} from '../Data/State';
import {setupReducer} from '../Data/Setup/SetupReducer';
import {fieldReducer} from '../Data/Field/FieldReducer';
import {submitReducer} from '../Data/Form/SubmitReducer';
import {formReducer} from '../Data/Form/FormReducer';
import {FieldConfigurationContext} from '../Field/FieldConfigurationContext';

const baseReducers = [setupReducer, fieldReducer, submitReducer, formReducer];

export function Form(props: PropsWithChildren<FormProps>) {
    const {children, reducers, serviceProvider, fieldConfiguration} = props;
    const allReducers = useMemo(() => baseReducers.concat(reducers ?? []), [reducers]);
    const createServiceFactory = useCallback(
        (dispatch: DispatchFunction, state: unknown) => {
            return serviceProvider
                ? serviceProvider(dispatch, state as State, props)
                : new DefaultServiceFactory(state as State, dispatch, props);
        },
        [props, serviceProvider],
    );

    const fieldConfigurationContextValue = useMemo(() => fieldConfiguration ?? {}, [fieldConfiguration]);

    return (
        <CoreProvider createServiceFactory={createServiceFactory} reducers={allReducers} initialState={INITIAL_STATE}>
            <FieldConfigurationContext.Provider value={fieldConfigurationContextValue}>
                {children}
            </FieldConfigurationContext.Provider>
        </CoreProvider>
    );
}
