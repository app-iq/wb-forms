import { FieldProps, FieldValue, WithArrayFieldProps, withArrayField } from 'wb-forms';

interface ArrayTextFieldProps extends WithArrayFieldProps, FieldProps {}
const _ArrayTextField: React.FC<ArrayTextFieldProps> = props => {
    const values = props.field.value as FieldValue[];
    const valid = props.field.valid as boolean[];
    return (
        <div>
            <button onClick={() => props.add()}>Add</button>
            {values.map((value, index) => (
                <div key={index}>
                    <input
                        style={{ display: 'inline-block', background: valid[index] ? 'white' : 'pink' }}
                        value={value}
                        onChange={e => props.handleChange(index, e.target.value)}
                    />
                    <button onClick={() => props.remove(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export const ArrayTextField = withArrayField(_ArrayTextField, '');

interface ArrayKeyValueFieldProps extends WithArrayFieldProps, FieldProps {}
const _ArrayKeyValueField: React.FC<ArrayKeyValueFieldProps> = props => {
    const values = props.field.value as FieldValue[];
    const valid = props.field.valid as boolean[];
    return (
        <div>
            <button onClick={() => props.add()}>Add</button>
            {values.map((value, index) => (
                <div key={index} style={{ display: 'flex', gap: 8 }}>
                    <label>Key</label>
                    <input
                        style={{ background: valid[index] ? 'white' : 'pink' }}
                        value={value.key ?? ''}
                        onChange={e => props.handleChange(index, { ...value, key: e.target.value})}
                    />
                    <label>Value</label>
                    <input
                        style={{ background: valid[index] ? 'white' : 'pink' }}
                        value={value.value ?? ''}
                        onChange={e => props.handleChange(index, {...value , value: e.target.value})}
                    />
                    <button onClick={() => props.remove(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export const ArrayKeyValueField = withArrayField(_ArrayKeyValueField, { key: '', value: 'test value' });
