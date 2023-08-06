import {DispatchFunction} from 'wb-core-provider';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {FieldActions} from '../../Data/Field/FieldActions';
import {FieldValidator} from '../Protocol/FieldValidator';
import {FieldConfiguration} from '../../Field/FieldProps';
import {filesValueSelector, ValueSelector} from '../../Field/ValueSelector';
import {FieldValue} from '../../Data/State';
import {FileUploader, UploadOptions} from '../Protocol/FileUploader';

export class DefaultFileChangeHandler implements ChangeHandler {
    protected readonly defaultValueSelector: ValueSelector;

    constructor(
        protected dispatch: DispatchFunction,
        protected fieldName: string,
        protected fieldValidator: FieldValidator,
        protected fileUploader: FileUploader,
        protected fieldConfiguration: FieldConfiguration,
        protected uploadOptions?: UploadOptions,
        valueSelector?: ValueSelector,
    ) {
        this.defaultValueSelector = valueSelector ?? filesValueSelector;
    }

    handle(e: FieldValue): void {
        // TODO: return(break) if field is not ready
        if (this.fieldConfiguration.readonly) {
            return;
        }

        if (this.shouldValidate()) {
            const valid = this.fieldValidator.validate(e, this.fieldConfiguration.validationRules);
            const validateAction = FieldActions.changeValidationState(this.fieldName, valid);
            this.dispatch(validateAction);

            if (!valid) {
                this.dispatch(FieldActions.changeValue(this.fieldName, ''));
                FieldActions.setCustomValue(this.fieldName, 'filValue', undefined);
                return;
            }
        }

        const valueSelector = this.fieldConfiguration.valueSelector ?? this.defaultValueSelector;
        const fileValue = valueSelector(e);
        this.dispatch(FieldActions.setCustomValue(this.fieldName, 'filValue', fileValue));
        if (this.uploadOptions) {
            this.dispatch(FieldActions.setReady(this.fieldName, false));
            this.fileUploader
                .uploadFile(e, this.uploadOptions)
                .then(value => {
                    this.dispatch(FieldActions.changeValue(this.fieldName, value));
                })
                .finally(() => {
                    this.dispatch(FieldActions.setReady(this.fieldName, true));
                });
        } else {
            this.dispatch(FieldActions.changeValue(this.fieldName, fileValue));
        }
    }

    private shouldValidate(): boolean {
        return (
            Boolean(this.fieldConfiguration.validateOnChange) &&
            !this.fieldConfiguration.skipValidation &&
            Boolean(this.fieldConfiguration.validationRules)
        );
    }
}
