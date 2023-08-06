import React from 'react';
import {createBaseFieldComponent, WithFieldProps} from './BaseFieldComponent';
import {FieldProps} from './FieldProps';
import {textValueSelector, ValueSelector} from './ValueSelector';

export function withField<Props extends FieldProps = FieldProps>(
    Component: React.ComponentType<Props & WithFieldProps>,
    defaultValueSelector: ValueSelector = textValueSelector,
    defaultProps: Partial<FieldProps> = {},
) {
    return createBaseFieldComponent<Props, Partial<FieldProps>>(
        Component,
        defaultProps,
        (props, serviceFactory) => serviceFactory.createChangeHandler(props.name, defaultValueSelector),
        props => ({
            value: props.initialValue ?? '',
            valid: props.initialValid ?? true,
            ready: true,
        }),
    );
}
