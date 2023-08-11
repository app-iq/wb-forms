import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {It, Mock, Times} from 'typemoq';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {Form} from '../../../Form/Form';
import {withFileField} from '../../../Field/WithFileField';
import {ChangeHandler} from '../../../Services/Protocol/ChangeHandler';
import {withField} from '../../../Field/WithField';
import {textValueSelector} from '../../../Field/ValueSelector';

function Field({handleChange, name, field}: FieldProps & WithFieldProps) {
    return (
        <div>
            <span>{name}</span>
            <span>is valid: {field.valid === true ? 'true' : 'false'}</span>
            <input type="file" placeholder={`${name}-field`} name={name} onChange={handleChange} value={field.value} />
        </div>
    );
}

const ConnectedField = withFileField(Field);

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
    const fileChangeHandler = Mock.ofType<ChangeHandler>();
    fileChangeHandler.setup(x => x.handle(It.isAny())).verifiable();

    render(
        <Form
            customServiceFactory={{
                fileChangeHandler: () => fileChangeHandler.object,
            }}
        >
            <ConnectedField name="test" />
        </Form>,
    );

    await waitFor(() => {
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('test-field') as HTMLInputElement;
    expect(input.value).toBe('');
    const file: File = new File([''], 'test.txt', {type: 'text/plain'});
    await act(() => fireEvent.change(input, {target: {files: [file]}}));
    fileChangeHandler.verify(x => x.handle(It.isAny()), Times.once());
});
