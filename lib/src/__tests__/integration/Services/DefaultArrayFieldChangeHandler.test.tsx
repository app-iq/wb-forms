import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {It, Mock, Times} from 'typemoq';
import {FieldProps} from '../../../Field/FieldProps';
import {withArrayField, WithArrayFieldProps} from '../../../Field/WithArrayField';
import {FieldValue} from '../../../Data/State';
import {Form} from '../../../Form/Form';
import '@testing-library/jest-dom';
import {FieldValidator} from '../../../Services/Protocol/FieldValidator';

function Field({name, field, handleChange, add, remove}: FieldProps & WithArrayFieldProps) {
    const values: FieldValue[] = field.value;
    const validArray: boolean[] = field.valid as boolean[];
    return (
        <div>
            {values.map((value, index) => {
                return (
                    <div key={index}>
                        <input
                            className={validArray[index] ? 'valid' : 'invalid'}
                            placeholder={`${name}-${index}`}
                            value={values[index]}
                            onChange={e => handleChange(index, e.target.value)}
                        />
                        <button type="button" onClick={() => remove(index)}>
                            Remove {index}
                        </button>
                    </div>
                );
            })}
            <button type="button" onClick={() => add()}>
                Add
            </button>
        </div>
    );
}

const ConnectedField = withArrayField(Field);

test('dont update when readonly is true', async () => {
    const {getByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    readonly: true,
                },
            }}
        >
            <ConnectedField name="abc" initialValue={['value-0', 'value-1', 'value-2']} />
        </Form>,
    );

    fireEvent.change(getByPlaceholderText('abc-0'), {target: {value: 'new value 0'}});
    fireEvent.change(getByPlaceholderText('abc-2'), {target: {value: 'new value 2'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('value-0');
        expect(getByPlaceholderText('abc-2')).toHaveValue('value-2');
    });
});

test('handle change value', async () => {
    const {getByPlaceholderText} = render(
        <Form>
            <ConnectedField name="abc" initialValue={['value-0', 'value-1', 'value-2']} />
        </Form>,
    );

    fireEvent.change(getByPlaceholderText('abc-0'), {target: {value: 'new value 0'}});
    fireEvent.change(getByPlaceholderText('abc-2'), {target: {value: 'new value 2'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('new value 0');
        expect(getByPlaceholderText('abc-2')).toHaveValue('new value 2');
    });
});

test('dont validate when validateOnChange is false', async () => {
    const fieldValidatorMock = Mock.ofType<FieldValidator>();
    fieldValidatorMock.setup(x => x.validate(It.isAny(), It.isAny())).verifiable();
    const {getByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: true,
                    validateOnChange: false,
                },
            }}
        >
            <ConnectedField name="abc" initialValue={['value-0', 'value-1', 'value-2']} />
        </Form>,
    );

    fireEvent.change(getByPlaceholderText('abc-0'), {target: {value: 'new value 0'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('new value 0');
    });
    fieldValidatorMock.verify(x => x.validate(It.isAny(), It.isAny()), Times.never());
});

test('dont validate when skipValidation is true', async () => {
    const fieldValidatorMock = Mock.ofType<FieldValidator>();
    fieldValidatorMock.setup(x => x.validate(It.isAny(), It.isAny())).verifiable();
    const {getByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: true,
                    skipValidation: true,
                },
            }}
        >
            <ConnectedField name="abc" initialValue={['value-0', 'value-1', 'value-2']} />
        </Form>,
    );

    fireEvent.change(getByPlaceholderText('abc-0'), {target: {value: 'new value 0'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('new value 0');
    });
    fieldValidatorMock.verify(x => x.validate(It.isAny(), It.isAny()), Times.never());
});

test('validate after change', async () => {
    const {getByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: '^[a-z]+$',
                },
            }}
        >
            <ConnectedField name="abc" initialValue={['abc', 'efg', 'hij']} initialValid={[true, true, true]} />
        </Form>,
    );

    fireEvent.change(getByPlaceholderText('abc-0'), {target: {value: 'xyz'}});
    fireEvent.change(getByPlaceholderText('abc-1'), {target: {value: 'xy z'}});
    fireEvent.change(getByPlaceholderText('abc-2'), {target: {value: 'xyz 2'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('xyz');
        expect(getByPlaceholderText('abc-0')).toHaveClass('valid');
        expect(getByPlaceholderText('abc-1')).toHaveValue('xy z');
        expect(getByPlaceholderText('abc-1')).toHaveClass('invalid');
        expect(getByPlaceholderText('abc-2')).toHaveValue('xyz 2');
        expect(getByPlaceholderText('abc-2')).toHaveClass('invalid');
    });
});

test('validate after change with validationRules as function', async () => {
    const {getByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: (index: number) => {
                        if (index % 2 === 0) {
                            return '^[a-z]+$';
                        }
                        return '^[0-9]+$';
                    },
                },
            }}
        >
            <ConnectedField
                name="abc"
                initialValue={['abc', '123', 'efg', '456']}
                initialValid={[true, true, true, true]}
            />
        </Form>,
    );

    fireEvent.change(getByPlaceholderText('abc-0'), {target: {value: 'xyz'}});
    fireEvent.change(getByPlaceholderText('abc-1'), {target: {value: 'abc'}});
    fireEvent.change(getByPlaceholderText('abc-2'), {target: {value: '456'}});
    fireEvent.change(getByPlaceholderText('abc-3'), {target: {value: '123'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('xyz');
        expect(getByPlaceholderText('abc-0')).toHaveClass('valid');
        expect(getByPlaceholderText('abc-1')).toHaveValue('abc');
        expect(getByPlaceholderText('abc-1')).toHaveClass('invalid');
        expect(getByPlaceholderText('abc-2')).toHaveValue('456');
        expect(getByPlaceholderText('abc-2')).toHaveClass('invalid');
        expect(getByPlaceholderText('abc-3')).toHaveValue('123');
        expect(getByPlaceholderText('abc-3')).toHaveClass('valid');
    });
});

test('add new input', async () => {
    const {getByPlaceholderText, getByText} = render(
        <Form>
            <ConnectedField
                name="abc"
                initialValue={['value-0', 'value-1', 'value-2']}
                initialValid={[false, false, false]}
            />
        </Form>,
    );

    fireEvent.click(getByText('Add'));
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('value-0');
        expect(getByPlaceholderText('abc-0')).toHaveClass('invalid');
        expect(getByPlaceholderText('abc-1')).toHaveValue('value-1');
        expect(getByPlaceholderText('abc-1')).toHaveClass('invalid');
        expect(getByPlaceholderText('abc-2')).toHaveValue('value-2');
        expect(getByPlaceholderText('abc-2')).toHaveClass('invalid');
        expect(getByPlaceholderText('abc-3')).toHaveValue('');
        expect(getByPlaceholderText('abc-3')).toHaveClass('valid');
    });
    fireEvent.change(getByPlaceholderText('abc-3'), {target: {value: 'new value 3'}});
    await waitFor(() => {
        expect(getByPlaceholderText('abc-3')).toHaveValue('new value 3');
        expect(getByPlaceholderText('abc-3')).toHaveClass('valid');
    });
});

test('dont add new input when readonly is true', async () => {
    const {getByPlaceholderText, getByText, queryByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    readonly: true,
                },
            }}
        >
            <ConnectedField
                name="abc"
                initialValue={['value-0', 'value-1', 'value-2']}
                initialValid={[false, false, false]}
            />
        </Form>,
    );

    fireEvent.click(getByText('Add'));
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toBeInTheDocument();
        expect(getByPlaceholderText('abc-1')).toBeInTheDocument();
        expect(getByPlaceholderText('abc-2')).toBeInTheDocument();
        expect(queryByPlaceholderText('abc-3')).not.toBeInTheDocument();
    });
});

test('remove input', async () => {
    const {getByPlaceholderText, getByText} = render(
        <Form>
            <ConnectedField
                name="abc"
                initialValue={['value-0', 'value-1', 'value-2']}
                initialValid={[true, false, true]}
            />
        </Form>,
    );

    fireEvent.click(getByText('Remove 1'));
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toHaveValue('value-0');
        expect(getByPlaceholderText('abc-0')).toHaveClass('valid');
        expect(getByPlaceholderText('abc-1')).toHaveValue('value-2');
        expect(getByPlaceholderText('abc-1')).toHaveClass('valid');
    });
});

test('dont remove input when readonly is true', async () => {
    const {getByPlaceholderText, getByText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    readonly: true,
                },
            }}
        >
            <ConnectedField
                name="abc"
                initialValue={['value-0', 'value-1', 'value-2']}
                initialValid={[true, false, true]}
            />
        </Form>,
    );

    fireEvent.click(getByText('Remove 1'));
    await waitFor(() => {
        expect(getByPlaceholderText('abc-0')).toBeInTheDocument();
        expect(getByPlaceholderText('abc-1')).toBeInTheDocument();
        expect(getByPlaceholderText('abc-2')).toBeInTheDocument();
    });
});
