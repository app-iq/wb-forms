import {DispatchFunction, useDispatch, useServiceFactory} from 'wb-core-provider';
import React, {useEffect} from 'react';
import {FieldState, FieldValue} from '../Data/State';
import {FieldProps} from './FieldProps';
import {useField} from './Hooks';
import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';
import {SetupActions} from '../Data/Setup/SetupActions';
import {useFieldConfiguration} from './FieldConfigurationContext';

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
        const {name, initialValue, initialValid} = props;
        const field = useField(name);
        const dispatch = useDispatch();
        const serviceFactory = useServiceFactory<ServiceFactory>();

        const changeHandler = serviceFactory.createArrayFieldChangeHandler(name, field);
        const isNotInitializedYet = field === undefined;
        const configuration = useFieldConfiguration(name) ?? {};

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(
                    SetupActions.initializeField(name, {
                        ready: true,
                        valid: initialValid ?? [true],
                        value: initialValue ?? [defaultValue],
                    }),
                );
            }
        }, [dispatch, initialValid, initialValue, isNotInitializedYet, name, props]);

        if (isNotInitializedYet) {
            return null;
        }

        if (configuration.hidden) {
            return <></>;
        }

        const toInjectProps: WithArrayFieldProps = {
            add: () => changeHandler.add(defaultValue),
            remove: index => changeHandler.remove(index),
            handleChange: (index, value) => changeHandler.handleChange(index, value),
            dispatch,
            field,
        };

        return <Component {...(props as Props)} {...toInjectProps} />;
    };
}
