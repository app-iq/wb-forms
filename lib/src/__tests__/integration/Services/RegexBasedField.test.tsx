import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {Form} from '../../../Form/Form';

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

test('should use regex to validate input', async () => {
    render(
        <Form
            fieldConfiguration={{
                abc: {
                    validationRules: /^[a-z]+$/,
                },
            }}
        >
            <ConnectedField name="abc" initialValue="initial" />
        </Form>,
    );

    const input = screen.getByPlaceholderText('abc') as HTMLInputElement;
    await act(() => fireEvent.change(input, {target: {value: 'my new value'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('invalid');
    await act(() => fireEvent.change(input, {target: {value: 'value'}}));
    expect(screen.getByPlaceholderText('abc')).toHaveClass('valid');
});
