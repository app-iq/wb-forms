import React, { useEffect } from 'react';
import { DispatchFunction, useDispatch, useServiceFactory } from 'wb-core-provider';
import { useFieldConfiguration } from './FieldConfigurationContext';
import { useField } from './Hooks';
import { ServiceFactory } from '../Services/ServiceFactory/ServiceFactory';
import { ChangeHandler } from '../Services/Protocol/ChangeHandler';
import { FieldState } from '../Data/State';
import { SetupActions } from '../Data/Setup/SetupActions';

export interface WithFieldProps {
    handleChange: (e: unknown) => void;
    field: FieldState;
    dispatch: DispatchFunction;
}

export function createBaseFieldComponent<Props extends { name: string }, TDefaultProps>(
    Component: React.ComponentType<Props & WithFieldProps>,
    defaultProps: TDefaultProps,
    createChangeHandler: (props: Omit<Props, keyof WithFieldProps>, serviceFactory: ServiceFactory) => ChangeHandler,
    createInitialFieldState: (props: Omit<Props, keyof WithFieldProps>) => FieldState
) {
    return function Wrapper(props: Omit<Props, keyof WithFieldProps>) {
        props = { ...props, ...defaultProps };
        const name = props.name;
        const field = useField(name);
        const dispatch = useDispatch();
        const serviceFactory = useServiceFactory<ServiceFactory>();
        const changeHandler = createChangeHandler(props, serviceFactory);
        const isNotInitializedYet = field === undefined;
        const configuration = useFieldConfiguration(props.name) ?? {};

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(SetupActions.initializeField(props.name, createInitialFieldState(props)));
            }
        }, [dispatch, isNotInitializedYet, props]);

        if (isNotInitializedYet) {
            return null;
        }

        if (configuration.hidden) {
            return <React.Fragment />;
        }

        const onChange = (e: unknown) => changeHandler.handle(e);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field,
        };

        return <Component {...(props as Props)} {...toInjectProps} />;
    };
}
