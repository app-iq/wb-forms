import {FieldValidator} from '../Protocol/FieldValidator';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {SubmitService} from '../Protocol/SubmitService';
import {FieldConfiguration} from '../../Field/FieldProps';
import {ValueSelector} from '../../Field/ValueSelector';
import {FormValidator} from '../Protocol/FormValidator';

export interface ServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator;

    createFormValidator(): FormValidator;

    createChangeHandler(fieldName: string, defaultValueSelector?: ValueSelector): ChangeHandler;

    createSubmitService(): SubmitService;

    getFieldConfiguration(fieldName: string): FieldConfiguration | undefined;
}

