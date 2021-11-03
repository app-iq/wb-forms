import {FieldValidator} from "../Protocol/FieldValidator";

export class RegexBasedFieldValidator implements FieldValidator {
    validate(value: any, pattern: any): boolean {
        if (!pattern) {
            return true;
        }
        let regex = new RegExp(pattern);
        value = value ? String(value) : '';
        return regex.test(value);
    }
}