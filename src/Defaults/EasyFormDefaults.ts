import {ValueSelector} from "../Field/Field";
import {textValueSelector} from "../Field/ValueSelector";

export interface EasyFormDefaults {
    fieldValue: string;
    valueSelector: ValueSelector;
}

export const easyFormDefaults: EasyFormDefaults = {
    fieldValue: '',
    valueSelector: textValueSelector
};