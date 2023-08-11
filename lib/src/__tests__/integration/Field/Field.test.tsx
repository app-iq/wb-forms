import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {Form} from '../../../Form/Form';
import {textValueSelector} from '../../../Field/ValueSelector';

interface Props extends FieldProps, WithFieldProps {
    customProps?: string;
}
function Field({handleChange, name, field, customProps}: Props) {
    return (
        <div>
            <span>{name}</span>
            <span>is valid: {field.valid === true ? 'true' : 'false'}</span>
            {customProps && <span>{customProps}</span>}
            <input placeholder={`${name}-field`} name={name} onChange={handleChange} value={field.value} />
        </div>
    );
}

const ConnectedField = withField(Field);

test('initialize and render field', async () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );

    await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
    });
});

test('hide field when hidden', async () => {
    render(
        <Form
            fieldConfiguration={{
                test: {
                    hidden: true,
                },
            }}
        >
            <ConnectedField name="test" />
        </Form>,
    );

    await waitFor(() => {
        expect(screen.queryByText('test')).not.toBeInTheDocument();
    });
});

test('handle change', async () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );

    await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('test-field') as HTMLInputElement;
    expect(input.value).toBe('');
    await act(() => fireEvent.change(input, {target: {value: 'new value'}}));
    expect(input.value).toBe('new value');
});

test('initial value', async () => {
    render(
        <Form>
            <ConnectedField name="test" initialValue="initial value" />
        </Form>,
    );

    expect(screen.getByPlaceholderText('test-field')).toHaveValue('initial value');
    const input = screen.getByPlaceholderText('test-field') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'new value'}}));
    expect(screen.getByPlaceholderText('test-field')).toHaveValue('new value');
});

test('initial valid', async () => {
    render(
        <Form
            fieldConfiguration={{
                test: {
                    validationRules: /\w{3,}/,
                },
            }}
        >
            <ConnectedField name="test" initialValid={false} />
        </Form>,
    );

    await waitFor(() => {
        expect(screen.getByText('is valid: false')).toBeInTheDocument();
    });
    await act(() => fireEvent.change(screen.getByPlaceholderText('test-field'), {target: {value: 'new value'}}));
    expect(screen.getByText('is valid: true')).toBeInTheDocument();
});

test('use value selector from params', async () => {
    const NewConnectedField = withField(Field, e => e.target.customValue);
    render(
        <Form>
            <NewConnectedField name="test" />
        </Form>,
    );

    const input = screen.getByPlaceholderText('test-field') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'test', customValue: 'new value'}}));
    expect(screen.getByPlaceholderText('test-field')).toHaveValue('new value');
});

test('use default props from params', async () => {
    const NewConnectedField = withField<Props>(Field, textValueSelector, {
        customProps: 'my custom props',
    });
    render(
        <Form>
            <NewConnectedField name="test" />
        </Form>,
    );

    expect(screen.getByText('my custom props')).toBeInTheDocument();
});
