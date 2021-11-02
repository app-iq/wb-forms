import {textValueSelector, ValueSelector} from "../Field/ValueSelector";

export interface Defaults {
    fieldValue: string;
    valueSelector: ValueSelector;
}

export const easyFormDefaults: Defaults = {
    fieldValue: '',
    valueSelector: textValueSelector
};