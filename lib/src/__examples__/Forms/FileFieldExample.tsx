import React from 'react';
import { Form } from '../../Form/Form';
import FileField from '../../DefaultComponents/FileField';

export function FileFieldExample() {
    
    return (
        <Form>
            <h1>File Form Example</h1>
            <hr />

            <FileField
                name={'file'}
                autoUpload={{
                    url: 'http://localhost:5050/file',
                    httpMethod: 'POST',
                    paramName: 'file',
                    valueExtractor: (response) =>
                        (response as Record<string, string>).fileName,
                }}
            />
        </Form>
    );
}
