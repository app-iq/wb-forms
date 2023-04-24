import { FieldProps, WithFieldProps, withField } from 'wb-forms';

interface Props extends FieldProps, WithFieldProps {
    inputProps?: unknown;
}

function _TextField(props: Props) {
    const { name, field, handleChange, inputProps } = props;

    return (
        <div style={{ padding: '8px 0' }}>
            <label>{name}</label>
            <span style={{ width: 8, display: 'inline-block' }} />
            <input
                name={name}
                value={field.value}
                {...(inputProps ?? {})}
                style={{ color: !field.valid ? 'red' : undefined }}
                onChange={handleChange}
            />
        </div>
    );
}

export const TextField = withField(_TextField);
