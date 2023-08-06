import {DispatchFunction} from 'wb-core-provider';
import {FieldState, FieldValue} from '../../Data/State';
import {ArrayFieldChangeHandler} from '../Protocol/ArrayFieldChangeHandler';
import {FieldValidator} from '../Protocol/FieldValidator';
import {FieldConfiguration} from '../../Field/FieldProps';
import {FieldActions} from '../../main';

export class DefaultArrayFieldChangeHandler implements ArrayFieldChangeHandler {
    constructor(
        protected readonly fieldName: string,
        protected readonly state: FieldState,
        protected readonly dispatch: DispatchFunction,
        protected readonly fieldValidator: FieldValidator,
        protected readonly fieldConfiguration: FieldConfiguration,
    ) {}

    add(defaultValue: FieldValue): void {
        if (this.fieldConfiguration.readonly) {
            return;
        }
        const valueAction = FieldActions.changeValue(this.fieldName, [...this.state.value, defaultValue]);
        this.dispatch(valueAction);
        const validationAction = FieldActions.changeValidationState(this.fieldName, [
            ...(this.state.valid as boolean[]),
            true,
        ]);
        this.dispatch(validationAction);
    }

    remove(index: number): void {
        if (this.fieldConfiguration.readonly) {
            return;
        }
        const action = FieldActions.changeValue(
            this.fieldName,
            this.state.value.filter((_: FieldValue, i: number) => i !== index),
        );
        this.dispatch(action);
        const validationAction = FieldActions.changeValidationState(
            this.fieldName,
            (this.state.valid as boolean[]).filter((_, i) => i !== index),
        );
        this.dispatch(validationAction);
    }

    handleChange(index: number, value: FieldValue): void {
        if (this.fieldConfiguration.readonly) {
            return;
        }
        const action = FieldActions.changeValue(
            this.fieldName,
            this.state.value.map((v: FieldValue, i: number) => (i === index ? value : v)),
        );
        this.dispatch(action);
        if (this.shouldValidate()) {
            const validationRules = this.getValidationRules(index);
            const valid = this.fieldValidator.validate(value, validationRules);
            const validationAction = FieldActions.changeValidationState(
                this.fieldName,
                (this.state.valid as boolean[]).map((v: boolean, i: number) => (i === index ? valid : v)),
            );
            this.dispatch(validationAction);
        }
    }

    private getValidationRules(index: number): unknown {
        const {validationRules} = this.fieldConfiguration;
        if (Array.isArray(validationRules)) {
            return validationRules[index];
        }
        if (typeof validationRules === 'function') {
            return validationRules(index, this.state);
        }
        return validationRules;
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
