import {DispatchFunction} from 'wb-core-provider';
import {FormValidator, ValidationResult} from '../Protocol/FormValidator';
import {FieldValue, FieldsState} from '../../Data/State';
import {ServiceFactory} from '../ServiceFactory/ServiceFactory';
import {FieldActions} from '../../Data/Field/FieldActions';
import {FieldValidator} from '../Protocol/FieldValidator';

export class DefaultFormValidator implements FormValidator {
    constructor(
        protected readonly fields: FieldsState,
        protected readonly serviceFactory: ServiceFactory,
        protected readonly dispatch: DispatchFunction,
    ) {
        this.fields = fields;
        this.serviceFactory = serviceFactory;
        this.dispatch = dispatch;
    }

    validate(): ValidationResult {
        const fieldsNames = Object.keys(this.fields);
        const valid = fieldsNames.reduce((v, fieldName) => {
            const isFieldValid = this.handleValidation(fieldName);
            return v && isFieldValid;
        }, true);
        return {valid, errors: []};
    }

    private handleValidation(fieldName: string) {
        const field = this.fields[fieldName];
        const validator = this.serviceFactory.createFieldValidator(fieldName);
        const fieldConfiguration = this.serviceFactory.getFieldConfiguration(fieldName);
        const skipValidation = fieldConfiguration?.skipValidation || !fieldConfiguration?.validationRules;
        let isFieldValid: boolean | boolean[] = true;
        if (!skipValidation) {
            if (Array.isArray(field.value)) {
                isFieldValid = this.validateArrayField(validator, field.value, fieldConfiguration?.validationRules);
            } else {
                isFieldValid = this.validateField(validator, field.value, fieldConfiguration?.validationRules);
            }
        }
        const validationAction = FieldActions.changeValidationState(fieldName, isFieldValid);
        this.dispatch(validationAction);
        return Array.isArray(isFieldValid) ? isFieldValid.every(valid => valid) : isFieldValid;
    }

    private validateArrayField(validator: FieldValidator, values: FieldValue[], validationRules: unknown) {
        return values.map(value => validator.validate(value, validationRules));
    }

    private validateField(validator: FieldValidator, value: FieldValue, validationRules: unknown) {
        return validator.validate(value, validationRules);
    }
}
