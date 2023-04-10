import React from 'react';
import { WithFieldProps, createBaseFieldComponent } from './BaseFieldComponent';
import { FileFieldProps } from './FileFieldProps';
import { ValueSelector, filesValueSelector } from './ValueSelector';

export function withFileField<Props extends FileFieldProps = FileFieldProps>(
    Component: React.ComponentType<Props & WithFieldProps>,
    defaultValueSelector: ValueSelector = filesValueSelector,
    defaultProps: Partial<FileFieldProps> = {}
) {
    return createBaseFieldComponent<Props, Partial<FileFieldProps>>(
        Component,
        defaultProps,
        (props, serviceFactory) =>
            serviceFactory.createFileChangeHandler(
                props.name,
                props.autoUpload,
                defaultValueSelector
            ),
        (_, defaults) => ({
            value: defaults.fieldValue,
            valid: true,
            ready: true,
        })
    );
}
