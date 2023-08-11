import {DispatchFunction} from 'wb-core-provider';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {FieldActions} from '../../Data/Field/FieldActions';
import {FieldValidator} from '../Protocol/FieldValidator';
import {ValueSelector} from '../../Field/ValueSelector';
import {FieldValue, State} from '../../Data/State';
import {FileUploader, UploadOptions} from '../Protocol/FileUploader';
import {BaseFieldService} from '../Base/BaseFieldService';
import {FormProps} from '../../Form/FormProps';
import {ServiceFactory} from '../ServiceFactory/ServiceFactory';

export class DefaultFileChangeHandler extends BaseFieldService implements ChangeHandler {
    public static readonly FILE_VALUE_KEY = 'fileValue';

    protected readonly fileUploader: FileUploader;

    protected readonly fieldValidator: FieldValidator;

    constructor(
        fieldName: string,
        state: State,
        dispatch: DispatchFunction,
        formProps: FormProps,
        serviceFactory: ServiceFactory,
        protected readonly valueSelector: ValueSelector,
        protected readonly uploadOptions?: UploadOptions,
    ) {
        super(fieldName, state, dispatch, formProps, serviceFactory);
        this.fileUploader = this.serviceFactory.createFileUploader();
        this.fieldValidator = this.serviceFactory.createFieldValidator(fieldName);
    }

    handle(e: FieldValue): void {
        const fieldConfiguration = this.getFieldConfiguration();
        if (!this.getFieldState().ready) {
            return;
        }
        if (fieldConfiguration.readonly) {
            return;
        }

        if (this.shouldValidate()) {
            const valid = this.fieldValidator.validate(e, fieldConfiguration.validationRules);
            const validateAction = FieldActions.changeValidationState(this.fieldName, valid);
            this.dispatch(validateAction);

            if (!valid) {
                this.dispatch(FieldActions.changeValue(this.fieldName, ''));
                FieldActions.setCustomValue(this.fieldName, DefaultFileChangeHandler.FILE_VALUE_KEY, undefined);
                return;
            }
        }

        const valueSelector = fieldConfiguration.valueSelector ?? this.valueSelector;
        const fileValue = valueSelector(e);
        this.dispatch(FieldActions.setCustomValue(this.fieldName, DefaultFileChangeHandler.FILE_VALUE_KEY, fileValue));
        if (this.uploadOptions) {
            this.dispatch(FieldActions.setReady(this.fieldName, false));
            this.fileUploader
                .uploadFile(e, this.uploadOptions)
                .then(value => {
                    this.dispatch(FieldActions.changeValue(this.fieldName, value));
                })
                .catch(error => {
                    this.uploadOptions?.onUploadFailed?.(error);
                })
                .finally(() => {
                    this.dispatch(FieldActions.setReady(this.fieldName, true));
                });
        } else {
            this.dispatch(FieldActions.changeValue(this.fieldName, fileValue));
        }
    }

    private shouldValidate(): boolean {
        const fieldConfiguration = this.getFieldConfiguration();
        return (
            Boolean(fieldConfiguration.validateOnChange) &&
            !fieldConfiguration.skipValidation &&
            Boolean(fieldConfiguration.validationRules)
        );
    }
}
