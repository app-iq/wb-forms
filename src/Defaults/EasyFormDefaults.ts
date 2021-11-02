import {textValueSelector, ValueSelector} from "../Field/ValueSelector";

export interface EasyFormDefaults {
    fieldValue: string;
    valueSelector: ValueSelector;
}

export const easyFormDefaults: EasyFormDefaults = {
    fieldValue: '',
    valueSelector: textValueSelector
};