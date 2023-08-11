import React, {useEffect, useMemo} from 'react';
import {DispatchFunction, useDispatch, useServiceFactory} from 'wb-core-provider';
import {useFieldConfiguration} from './FieldConfigurationContext';
import {useField} from './Hooks';
import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';
import {ChangeHandler} from '../Services/Protocol/ChangeHandler';
import {FieldState} from '../Data/State';
import {SetupActions} from '../Data/Setup/SetupActions';

export interface WithFieldProps {
    handleChange: (e: unknown) => void;
    field: FieldState;
    dispatch: DispatchFunction;
}

export function createBaseFieldComponent<Props extends {name: string}, TDefaultProps>(
    Component: React.ComponentType<Props & WithFieldProps>,
    defaultProps: TDefaultProps,
    createChangeHandler: (props: Omit<Props, keyof WithFieldProps>, serviceFactory: ServiceFactory) => ChangeHandler,
    createInitialFieldState: (props: Omit<Props, keyof WithFieldProps>) => FieldState,
    buildOnChange?: (changeHandler: ChangeHandler, props: Props) => (e: unknown) => void,
) {
    return function Wrapper(props: Omit<Props, keyof WithFieldProps>) {
        const propsWithDefaults = useMemo(() => ({...props, ...defaultProps}) as unknown as Props, [props]);
        const {name} = propsWithDefaults;
        const field = useField(name);
        const dispatch = useDispatch();
        const serviceFactory = useServiceFactory<ServiceFactory>();
        const changeHandler = createChangeHandler(propsWithDefaults, serviceFactory);
        const isNotInitializedYet = field === undefined;
        const configuration = useFieldConfiguration(name) ?? {};

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(SetupActions.initializeField(name, createInitialFieldState(propsWithDefaults)));
            }
        }, [dispatch, isNotInitializedYet, name, propsWithDefaults]);

        if (isNotInitializedYet) {
            return null;
        }

        if (configuration.hidden) {
            return <></>;
        }

        const onChange = buildOnChange
            ? buildOnChange(changeHandler, propsWithDefaults)
            : (e: unknown) => changeHandler.handle(e);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch,
            field,
        };

        return <Component {...propsWithDefaults} {...toInjectProps} />;
    };
}
