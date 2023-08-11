import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {It, Mock, Times} from 'typemoq';
import {FieldProps} from '../../../Field/FieldProps';
import {withFileField} from '../../../Field/WithFileField';
import {Form} from '../../../Form/Form';
import {FieldValidator} from '../../../Services/Protocol/FieldValidator';
import {filesValueSelector} from '../../../Field/ValueSelector';
import {FileFieldProps} from '../../../Field/FileFieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {FileUploader} from '../../../Services/Protocol/FileUploader';
import '@testing-library/jest-dom';

function Field({name, field, handleChange}: FieldProps & WithFieldProps & FileFieldProps) {
    const fileName = field.value?.name ?? '-';
    return (
        <div>
            <span>File Name: {fileName}</span>
            {typeof field.value === 'string' && <span>Upload Value: {field.value ?? '-'}</span>}
            <span>Ready: {field.ready ? 'true' : 'false'}</span>
            <input
                type="file"
                disabled={!field.ready}
                className={field.valid ? 'valid' : 'invalid'}
                placeholder={name}
                name={name}
                onChange={e => handleChange(e)}
            />
        </div>
    );
}

const ConnectedField = withFileField(Field);

test('should not update when readonly is true', async () => {
    const {getByPlaceholderText, getByText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    readonly: true,
                },
            }}
        >
            <ConnectedField name="abc" />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}});
    await waitFor(() => {
        expect(getByText('File Name: -')).toBeInTheDocument();
    });
});

test('should not change the value when not valid', async () => {
    const fieldValidator = Mock.ofType<FieldValidator>();
    fieldValidator.setup(x => x.validate(It.isAny(), It.isAny())).returns(() => false);
    const {getByPlaceholderText, getByText} = render(
        <Form
            customServiceFactory={{
                fieldValidator: () => fieldValidator.object,
            }}
            fieldConfiguration={{
                abc: {
                    validationRules: true,
                    validateOnChange: true,
                },
            }}
        >
            <ConnectedField name="abc" />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}});
    await waitFor(() => {
        expect(getByText('File Name: -')).toBeInTheDocument();
    });
});

test('use default value selector', async () => {
    const {getByPlaceholderText} = render(
        <Form>
            <ConnectedField name="abc" />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}});
    await waitFor(() => {
        const input = getByPlaceholderText('abc') as HTMLInputElement;
        expect(input.files).toHaveLength(1);
        expect(input.files?.[0]?.name).toBe('test.png');
    });
});

test('use value selector from configuration', async () => {
    const {getByPlaceholderText} = render(
        <Form
            fieldConfiguration={{
                abc: {
                    valueSelector: filesValueSelector,
                },
            }}
        >
            <ConnectedField name="abc" />
        </Form>,
    );
    const files = [
        new File(['(⌐□_□)'], 'test1.png', {type: 'image/png'}),
        new File(['(⌐□_□)'], 'test2.png', {type: 'image/png'}),
    ];

    fireEvent.change(getByPlaceholderText('abc'), {target: {files}});
    await waitFor(() => {
        const input = getByPlaceholderText('abc') as HTMLInputElement;
        expect(input.files).toHaveLength(2);
        expect(input.files?.[0]?.name).toBe('test1.png');
        expect(input.files?.[1]?.name).toBe('test2.png');
    });
});

test('auto upload file and change ready status', async () => {
    const fileUploaderMock = Mock.ofType<FileUploader>();
    fileUploaderMock.setup(x => x.uploadFile(It.isAny(), It.isAny())).returns(() => Promise.resolve('uploads/999.png'));
    const {getByPlaceholderText, getByText} = render(
        <Form
            customServiceFactory={{
                fileUploader: () => fileUploaderMock.object,
            }}
        >
            <ConnectedField
                name="abc"
                autoUpload={{
                    url: 'http://localhost',
                    httpMethod: 'POST',
                    paramName: 'file',
                    // doesn't matter, response is mocked, it's here just to make typescript happy
                    valueExtractor: () => 'uploads/999.png',
                }}
            />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    act(() => fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}}));

    await waitFor(() => {
        expect(getByText('Ready: false')).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(getByText('Ready: true')).toBeInTheDocument();
        expect(getByText('Upload Value: uploads/999.png')).toBeInTheDocument();
    });
});

test('on upload failed', async () => {
    const mockedOnUploadFailed = jest.fn();
    const fileUploaderMock = Mock.ofType<FileUploader>();
    fileUploaderMock.setup(x => x.uploadFile(It.isAny(), It.isAny())).returns(() => Promise.reject(new Error('error')));
    const {getByPlaceholderText, getByText} = render(
        <Form
            customServiceFactory={{
                fileUploader: () => fileUploaderMock.object,
            }}
        >
            <ConnectedField
                name="abc"
                autoUpload={{
                    url: 'http://localhost',
                    httpMethod: 'POST',
                    paramName: 'file',
                    // doesn't matter, response is mocked, it's here just to make typescript happy
                    valueExtractor: () => 'uploads/999.png',
                    onUploadFailed: mockedOnUploadFailed,
                }}
            />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    act(() => fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}}));

    await waitFor(() => {
        expect(getByText('Ready: false')).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(getByText('Ready: true')).toBeInTheDocument();
        expect(mockedOnUploadFailed).toBeCalledTimes(1);
    });
});

test('when field is not ready then it should not change the', async () => {
    const fileUploaderMock = Mock.ofType<FileUploader>();
    fileUploaderMock
        .setup(x => x.uploadFile(It.isAny(), It.isAny()))
        .returns(() => Promise.resolve('uploads/999.png'))
        .verifiable();
    const {getByPlaceholderText, getByText} = render(
        <Form
            customServiceFactory={{
                fileUploader: () => fileUploaderMock.object,
            }}
        >
            <ConnectedField
                name="abc"
                autoUpload={{
                    url: 'http://localhost',
                    httpMethod: 'POST',
                    paramName: 'file',
                    // doesn't matter, response is mocked, it's here just to make typescript happy
                    valueExtractor: () => 'uploads/999.png',
                }}
            />
        </Form>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {type: 'image/png'});
    act(() => fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}}));

    await waitFor(() => {
        expect(getByText('Ready: false')).toBeInTheDocument();
        act(() => fireEvent.change(getByPlaceholderText('abc'), {target: {files: [file]}}));
    });

    await waitFor(() => {
        expect(getByText('Ready: true')).toBeInTheDocument();
        expect(getByText('Upload Value: uploads/999.png')).toBeInTheDocument();
    });
    fileUploaderMock.verify(x => x.uploadFile(It.isAny(), It.isAny()), Times.once());
});
