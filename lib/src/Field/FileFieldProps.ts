import { FieldValue } from '../Data/State';
import { UploadOptions } from '../Services/Protocol/FileUploader';

export interface FileFieldProps {
    name: string;
    autoUpload?: UploadOptions;
    initialValue?: FieldValue;
    initialValid?: boolean;
}