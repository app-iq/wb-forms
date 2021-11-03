export interface FieldValidator {
    validate(value: any, rules: any): boolean;
}