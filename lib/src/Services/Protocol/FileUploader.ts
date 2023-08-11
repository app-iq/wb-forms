import {SyntheticEvent} from 'react';

export interface FileUploader {
    uploadFile(event: SyntheticEvent, options: UploadOptions): Promise<string>;
}

export interface UploadOptions {
    url: string;
    httpMethod: string;
    paramName: string;
    valueExtractor: (response: unknown) => string;
    onUploadFailed?: (error: unknown) => void;
}
