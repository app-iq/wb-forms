import React from 'react';
import {WithFieldProps, createBaseFieldComponent} from './BaseFieldComponent';
import {FileFieldProps} from './FileFieldProps';
import {ValueSelector, singleFileSelector} from './ValueSelector';

export function withFileField<Props extends FileFieldProps = FileFieldProps>(
    Component: React.ComponentType<Props & WithFieldProps>,
    defaultValueSelector: ValueSelector = singleFileSelector,
    defaultProps: Partial<Props> = {},
) {
    return createBaseFieldComponent<Props, Partial<FileFieldProps>>(
        Component,
        defaultProps,
        (props, serviceFactory) =>
            serviceFactory.createFileChangeHandler(props.name, defaultValueSelector, props.autoUpload),
        props => ({
            value: props.initialValid ?? '',
            valid: props.initialValid ?? true,
            ready: true,
        }),
    );
}
