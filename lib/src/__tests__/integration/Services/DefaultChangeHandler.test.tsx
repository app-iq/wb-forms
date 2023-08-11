import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {Form} from '../../../Form/Form';
import {DefaultChangeHandler} from '../../../Services/DefaultImplementation/DefaultChangeHandler';

function Field({name, field, handleChange}: FieldProps & WithFieldProps) {
    return (
        <input
            className={field.valid ? 'valid' : 'invalid'}
            placeholder={name}
            name={name}
            value={field.value}
            onChange={e => handleChange(e)}
        />
    );
}

const ConnectedField = withField(Field);

test('skip change when configuration set to readonly', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    readonly: true,
                },
            }}
        >
            <ConnectedField name="abc" initialValue="test-value" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveValue('test-value');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'my new value'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveValue('test-value');
});

test('use value selector from configuration', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    valueSelector: e => e.target.customValue,
                },
            }}
        >
            <ConnectedField name="abc" initialValue="test-value" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveValue('test-value');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: '', customValue: 'new-value'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveValue('new-value');
});

test('use default value selector', async () => {
    render(
        <Form
            customServiceFactory={{
                changeHandler: (fieldName, state, dispatch, props, self) =>
                    new DefaultChangeHandler(
                        dispatch,
                        fieldName,
                        self.createFieldValidator('abc'),
                        {},
                        e => e.target.customValue,
                    ),
            }}
        >
            <ConnectedField name="abc" initialValue="test-value" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveValue('test-value');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: '', customValue: 'new-value'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveValue('new-value');
});

test('call listener when value changes', async () => {
    const listener = jest.fn();
    render(
        <Form>
            <ConnectedField name="abc" initialValue="test-value" onValueChange={listener} />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveValue('test-value');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'new-value'}}));
    expect(listener).toHaveBeenCalledWith('new-value', expect.any(Function));
});

test('validate on change', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: '^[a-z]+$',
                },
            }}
        >
            <ConnectedField name="abc" initialValue="initial" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'test12'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('invalid');
    await act(() => fireEvent.change(input, {target: {value: 'test'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
});

test('skip validation when validateOnChange set to false (from configuration)', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: '^[a-z]+$',
                    validateOnChange: false,
                },
            }}
        >
            <ConnectedField name="abc" initialValue="initial" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'test12'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
});

test('skip validation when skipValidation set to true (from configuration)', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: '^[a-z]+$',
                    skipValidation: true,
                },
            }}
        >
            <ConnectedField name="abc" initialValue="initial" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'test12'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
});

test('skip validation when validationRules are empty (from configuration)', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: '',
                },
            }}
        >
            <ConnectedField name="abc" initialValue="initial" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'test12'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
});
