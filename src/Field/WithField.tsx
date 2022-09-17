import {useField} from './Hooks';
import React, {useEffect} from 'react';
import {FieldProps} from './FieldProps';
import {useServiceFactory} from '../Services/ServiceFactory/Hooks';
import {SetupActions} from '../Data/Setup/SetupActions';
import {useDispatch} from '../Form/Hooks';
import {DispatchFunction} from '../Form/DispatchContext';
import {FieldState} from '../Data/State';
import {useDefaults} from '../Defaults/DefaultsContext';
import {useFieldConfiguration} from './FieldConfigurationContext';
import {textValueSelector, ValueSelector} from './ValueSelector';

export interface WithFieldProps {
    handleChange: (e: unknown) => void;
    field: FieldState;
    dispatch: DispatchFunction;
}


export function withField<Props extends FieldProps = FieldProps>(Component: React.ComponentType<Props & WithFieldProps>,
                                                                 defaultValueSelector: ValueSelector = textValueSelector,
                                                                 defaultProps: Partial<FieldProps> = {}) {
    return function Wrapper(props: Omit<Props, keyof WithFieldProps>) {
        props = {...props, ...defaultProps};
        const name = props.name;
        const field = useField(name);
        const dispatch = useDispatch();
        const serviceFactory = useServiceFactory();
        const defaults = useDefaults();
        const changeHandler = serviceFactory.createChangeHandler(name, defaultValueSelector);
        const isNotInitializedYet = field === undefined;
        const configuration = useFieldConfiguration(props.name) ?? {};

        useEffect(() => {
            if (isNotInitializedYet) {
                const initialFieldState = {
                    value: props.initialValue ?? defaults.fieldValue,
                    valid: props.initialValid ?? true
                };
                dispatch(SetupActions.initializeField(props.name, initialFieldState));
            }
        }, [dispatch, defaults, isNotInitializedYet, props]);

        if (isNotInitializedYet) {
            return null;
        }

        if (configuration.hidden) {
            return <React.Fragment/>;
        }

        const onChange = (e: unknown) => changeHandler.handle(e, props.onValueChange);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };

        return <Component {...(props as Props)} {...toInjectProps}/>;
    };
}
