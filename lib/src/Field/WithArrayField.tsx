import { DispatchFunction, useDispatch, useServiceFactory } from 'wb-core-provider';
import { FieldState, FieldValue } from '../Data/State';
import { FieldProps } from './FieldProps';
import { useField } from './Hooks';
import { ServiceFactory } from '../Services/ServiceFactory/ServiceFactory';
import { SetupActions } from '../Data/Setup/SetupActions';
import { useEffect } from 'react';
import { useFieldConfiguration } from './FieldConfigurationContext';
import React from 'react';

export interface WithArrayFieldProps {
    add: () => void;
    remove: (index: number) => void;
    handleChange: (index: number, value: FieldValue) => void;
    dispatch: DispatchFunction;
    field: FieldState;
}

export function withArrayField<Props extends FieldProps = FieldProps>(
    Component: React.ComponentType<Props & WithArrayFieldProps>,
    defaultValue: FieldValue = '',
) {
    return function ArrayFieldWrapper(props: Omit<Props, keyof WithArrayFieldProps>) {
        props = { ...props };
        const name = props.name;
        const field = useField(name);
        const dispatch = useDispatch();
        const serviceFactory = useServiceFactory<ServiceFactory>();
        
        const changeHandler = serviceFactory.createArrayFieldChangeHandler(name, field);
        const isNotInitializedYet = field === undefined;
        const configuration = useFieldConfiguration(props.name) ?? {};

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(
                    SetupActions.initializeField(props.name, {
                        ready: true,
                        valid: props.initialValid ?? [true],
                        value: props.initialValue ?? [defaultValue]
                    })
                );
            }
        }, [dispatch, isNotInitializedYet, props]);

        if (isNotInitializedYet) {
            return null;
        }

        if (configuration.hidden) {
            return <React.Fragment />;
        }

        const toInjectProps: WithArrayFieldProps = {
            add: () => changeHandler.add(defaultValue),
            remove: (index) => changeHandler.remove(index),
            handleChange: (index,value) => changeHandler.handleChange(index, value),
            dispatch: dispatch,
            field: field,
        };

        return <Component {...(props as Props)} {...toInjectProps} />;
    };
}