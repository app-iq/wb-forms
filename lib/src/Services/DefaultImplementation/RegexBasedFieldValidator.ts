import {FieldValidator} from '../Protocol/FieldValidator';
import {FieldValue} from '../../Data/State';

export class RegexBasedFieldValidator implements FieldValidator {
    validate(value: FieldValue, pattern: RegExp | string): boolean {
        if (!pattern) {
            return true;
        }
        const regex = new RegExp(pattern);
        const strValue = value ? String(value) : '';
        return regex.test(strValue);
    }
}
