import { SyntheticEvent } from 'react';
import { FileUploader, UploadOptions } from '../Protocol/FileUploader';

export class DefaultFileUploader implements FileUploader {
    async uploadFile(event: SyntheticEvent<HTMLInputElement>, options: UploadOptions): Promise<string> {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (!file) {
            throw Error('cannot read file from event object: e.target.files[0]');
        }
        const formData = new FormData();
        formData.append(options.paramName, file);

        const response = await fetch(options.url, {
            method: options.httpMethod,
            body: formData,
        });
        const jsonResponse = await response.json();
        return options.valueExtractor(jsonResponse);
    }
}
