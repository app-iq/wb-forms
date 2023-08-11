import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {FileFieldProps} from '../../../Field/FileFieldProps';
import {withFileField} from '../../../Field/WithFileField';
import {Form} from '../../../Form/Form';
import '@testing-library/jest-dom';

function Field({name, field, handleChange}: FieldProps & WithFieldProps & FileFieldProps) {
    return (
        <div>
            <span>Upload Value: {field.value ?? '-'}</span>

            <input type="file" placeholder={name} name={name} onChange={e => handleChange(e)} />
        </div>
    );
}

const ConnectedField = withFileField(Field);

const mockFetch = jest.fn();
global.fetch = mockFetch;

test('upload file', async () => {
    mockFetch.mockClear().mockReturnValue(
        Promise.resolve({
            json: () => Promise.resolve({path: '123456.png'}),
        }),
    );
    const {getByPlaceholderText, getByText} = render(
        <Form>
            <ConnectedField
                name="abc"
                autoUpload={{
                    url: 'http://localhost:3000',
                    httpMethod: 'POST',
                    paramName: 'fileValue',
                    valueExtractor: response => (response as Record<string, string>).path,
                }}
            />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}});
    await waitFor(() => {
        expect(getByText('Upload Value: 123456.png')).toBeInTheDocument();
    });
    const formData = new FormData();
    formData.append('fileValue', file);
    expect(mockFetch).toBeCalledWith('http://localhost:3000', {
        method: 'POST',
        body: formData,
    });
});

test('throws error when cannot read file from event', async () => {
    const mockedOnUploadFailed = jest.fn();
    const {getByPlaceholderText} = render(
        <Form>
            <ConnectedField
                name="abc"
                autoUpload={{
                    url: 'http://localhost:3000',
                    httpMethod: 'POST',
                    paramName: 'fileValue',
                    valueExtractor: response => (response as Record<string, string>).path,
                    onUploadFailed: mockedOnUploadFailed,
                }}
            />
        </Form>,
    );
    await act(() => fireEvent.change(getByPlaceholderText('abc'), {target: {files: []}}));
    expect(mockedOnUploadFailed).toBeCalledWith(new Error('cannot read file from event object: e.target.files[0]'));
});
