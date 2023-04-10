import React from 'react';
import { withFileField } from '../Field/WithFileField';
import { FileFieldProps } from '../Field/FileFieldProps';
import { WithFieldProps } from '../Field/BaseFieldComponent';

interface Props extends FileFieldProps, WithFieldProps {
    inputProps?: unknown;
}

function FileField(props: Props) {
    const { name, field, handleChange, inputProps } = props;

    return (
        <div style={{ padding: '8px 0' }}>
            {!field.ready && <h1>Uploading...</h1>}
            <label>{name}</label>
            <span style={{ width: 8, display: 'inline-block' }} />
            <input
                name={name}
                value={(field.fileValue as any) ?? ''}
                type="file"
                {...(inputProps ?? {})}
                style={{ color: !field.valid ? 'red' : undefined }}
                onChange={handleChange}
            />
        </div>
    );
}

export default withFileField(FileField);
