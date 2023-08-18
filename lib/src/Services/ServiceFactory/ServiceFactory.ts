import {FieldValidator} from '../Protocol/FieldValidator';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {SubmitService} from '../Protocol/SubmitService';
import {FieldConfiguration} from '../../Field/FieldProps';
import {ValueSelector} from '../../Field/ValueSelector';
import {FormValidator} from '../Protocol/FormValidator';
import {FileUploader, UploadOptions} from '../Protocol/FileUploader';
import {ArrayFieldChangeHandler} from '../Protocol/ArrayFieldChangeHandler';
import {DataCollector} from '../Protocol/DataCollector';
import {FieldState} from '../../Data/State';

export interface ServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator;

    createFormValidator(): FormValidator;

    createChangeHandler(fieldName: string, defaultValueSelector?: ValueSelector): ChangeHandler;

    createFileChangeHandler(
        fieldName: string,
        defaultValueSelector?: ValueSelector,
        autoUploadOptions?: UploadOptions,
    ): ChangeHandler;

    createArrayFieldChangeHandler(fieldName: string, fieldState: FieldState): ArrayFieldChangeHandler;

    createSubmitService(): SubmitService;

    createFileUploader(): FileUploader;

    createDataCollectorService(): DataCollector;

    getFieldConfiguration(fieldName: string): FieldConfiguration | undefined;
}
