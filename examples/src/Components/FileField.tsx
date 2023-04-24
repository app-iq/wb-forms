import { FieldValue, FileFieldProps, WithFieldProps, withFileField } from 'wb-forms';

interface Props extends FileFieldProps, WithFieldProps {
    inputProps?: unknown;
}

function _FileField(props: Props) {
    const { name, field, handleChange, inputProps } = props;

    return (
        <div style={{ padding: '8px 0' }}>
            {!field.ready && <h1>Uploading...</h1>}
            <label>{name}</label>
            <span style={{ width: 8, display: 'inline-block' }} />
            <input
                name={name}
                value={(field.fileValue as FieldValue) ?? ''}
                type="file"
                {...(inputProps ?? {})}
                style={{ color: !field.valid ? 'red' : undefined }}
                onChange={handleChange}
            />
        </div>
    );
}

export const FileField = withFileField(_FileField);
