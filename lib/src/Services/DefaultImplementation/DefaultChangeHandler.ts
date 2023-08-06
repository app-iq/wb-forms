import {DispatchFunction} from 'wb-core-provider';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {FieldActions} from '../../Data/Field/FieldActions';
import {FieldValidator} from '../Protocol/FieldValidator';
import {FieldConfiguration} from '../../Field/FieldProps';
import {textValueSelector, ValueSelector} from '../../Field/ValueSelector';
import {FieldValue} from '../../Data/State';

export class DefaultChangeHandler implements ChangeHandler {
    protected readonly defaultValueSelector: ValueSelector;

    constructor(
        protected readonly dispatch: DispatchFunction,
        protected readonly fieldName: string,
        protected readonly fieldValidator: FieldValidator,
        protected readonly fieldConfiguration: FieldConfiguration,
        valueSelector?: ValueSelector,
    ) {
        this.fieldValidator = fieldValidator;
        this.dispatch = dispatch;
        this.fieldConfiguration = fieldConfiguration;
        this.fieldName = fieldName;
        this.defaultValueSelector = valueSelector ?? textValueSelector;
    }

    handle(e: FieldValue, listener?: (newValue: FieldValue, dispatch: DispatchFunction) => void): void {
        if (this.fieldConfiguration.readonly) {
            return;
        }

        const valueSelector = this.fieldConfiguration.valueSelector ?? this.defaultValueSelector;
        const newValue = valueSelector(e);
        this.dispatch(FieldActions.changeValue(this.fieldName, newValue));
        listener?.(newValue, this.dispatch);
        if (this.shouldValidate()) {
            const validateAction = FieldActions.changeValidationState(
                this.fieldName,
                this.fieldValidator.validate(newValue, this.fieldConfiguration.validationRules),
            );
            this.dispatch(validateAction);
        }
    }

    private shouldValidate(): boolean {
        const validateOnChange = this.fieldConfiguration.validateOnChange ?? true;
        return (
            validateOnChange &&
            !this.fieldConfiguration.skipValidation &&
            Boolean(this.fieldConfiguration.validationRules)
        );
    }
}
