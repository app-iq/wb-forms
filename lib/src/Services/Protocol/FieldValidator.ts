import {FieldValue} from '../../Data/State';

export interface FieldValidator {
    validate(value: FieldValue, rules: unknown): boolean;
}
