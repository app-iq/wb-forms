import { FieldValidator } from '../Protocol/FieldValidator';
import { ChangeHandler } from '../Protocol/ChangeHandler';
import { SubmitService } from '../Protocol/SubmitService';
import { FieldConfiguration } from '../../Field/FieldProps';
import { ValueSelector } from '../../Field/ValueSelector';
import { FormValidator } from '../Protocol/FormValidator';
import { FileUploader, UploadOptions } from '../Protocol/FileUploader';

export interface ServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator;

    createFormValidator(): FormValidator;

    createChangeHandler(
        fieldName: string,
        defaultValueSelector?: ValueSelector
    ): ChangeHandler;

    createFileChangeHandler(
        fieldName: string,
        autoUploadOptions?: UploadOptions,
        defaultValueSelector?: ValueSelector
    ): ChangeHandler;

    createSubmitService(): SubmitService;

    createFileUploader(): FileUploader;

    getFieldConfiguration(fieldName: string): FieldConfiguration | undefined;
}
