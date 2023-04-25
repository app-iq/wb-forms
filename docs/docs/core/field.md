---
sidebar_position: 2
---

# Field

when it come to the fields you usually need to manage the state of the field and maybe the validation of the field, we provided you with two HOCs that will make your life easy.

## withFiled

this HOC inject three properties to your component:

- handleChange: a ready to use function to handle onChange event for your field.
- field: the state of the field.
- dispatch: dispatch function that you can use to dispatch actions.

checkout the following example:

    import { FieldProps, withField, WithFieldProps } from 'wb-forms';

    interface Props extends FieldProps, WithFieldProps {
        // define your additional props here
    }

    function TextField(props: Props) {

        // these fields will be injected to your component props
        const {name, field, handleChange, inputProps} = props;

        return <div>
            <label>{name}</label>
            <input name={name}
                value={field.value}
                onChange={handleChange}
                style={{color: !field.valid ? 'red' : undefined}}
            />
        </div>;

    }

    export default withField(TextField);

## withFileFiled

this HOC is similar to `withField` it injects the same properties to the component, its only internally inject `onChange` with different behavior.

checkout the following example:

    function FileField(props: Props) {
        const { name, field, handleChange } = props;

        return (
            <div>
                {!field.ready && <h1>Uploading...</h1>}
                <label>{name}</label>
                <input
                    name={name}
                    value={(field.fileValue as any) ?? ''}
                    type="file"
                    onChange={handleChange}
                />
            </div>
        );
    }

    export default withFileField(FileField);

## withArrayField

this HOC help you building multiple fields, it will inject five properties to your component:

- handleChange: a ready to use function to handle onChange event for your field.
- field: the state of the field.
- dispatch: dispatch function that you can use to dispatch actions.
- add: a function to add new field.
- remove: a function to remove field with an index.

it also accept default value for the newly added field.

    const _ArrayTextField: React.FC<Props> = props => {
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

## Field Configuration

each field has set for configuration, you can set these configuration via the `Form` component

    <Form fieldConfiguration={{
        email: {
            validationRules: '...'
        }
    }}>
        ...
    </Form>

    {
        validationRules?: unknown;
        skipValidation?: boolean;
        validateOnChange?: boolean;
        fieldValidator?: ServiceCallback<FieldValidator> | undefined;
        changeHandler?: ServiceCallback<ChangeHandler> | undefined;
        clearValue?: unknown;
        valueSelector?: ValueSelector;
        hidden?: boolean;
        readonly?: boolean;
    }

- **validationRules** the rules that will be used by the validation service to validate field value.

- **skipValidation** flag to indicate either to validate this field or not.

- **validateOnChange** flag to indicate either to validate this field on value change.

- **valueSelector** callback that used to extract value from the input change event.

- **clearValue** the value that will be used to set field value when clear action triggered.

- **hidden** flag to indicate either to render the input or not.

- **readonly** flag to indicate either to prevent changes on field or not.
