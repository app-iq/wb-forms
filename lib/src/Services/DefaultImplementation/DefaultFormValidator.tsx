import {FormValidator, ValidationResult} from '../Protocol/FormValidator';
import {FieldsState} from '../../Data/State';
import {ServiceFactory} from '../ServiceFactory/ServiceFactory';

export class DefaultFormValidator implements FormValidator {

    private readonly fields: FieldsState;
    private readonly serviceFactory: ServiceFactory;

    constructor(fields: FieldsState, serviceFactory: ServiceFactory) {
        this.fields = fields;
        this.serviceFactory = serviceFactory;
    }

    validate(): ValidationResult {
        const fieldsNames = Object.keys(this.fields);
        const valid = fieldsNames.reduce((v, fieldName) => {
            const field = this.fields[fieldName];
            const validator = this.serviceFactory.createFieldValidator(fieldName);
            const fieldConfiguration = this.serviceFactory.getFieldConfiguration(fieldName);
            const isFieldValid = fieldConfiguration?.skipValidation ? true : validator.validate(field.value, fieldConfiguration?.validationRules);
            return v && isFieldValid;
        }, true);
        return {valid, errors: []};
    }

}
