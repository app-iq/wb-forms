import {textValueSelector, ValueSelector} from "../Field/ValueSelector";

export interface Defaults {
    clearValue: any;
    fieldValue: string;
    valueSelector: ValueSelector;
}

export const formDefaults: Defaults = {
    fieldValue: '',
    clearValue: '',
    valueSelector: textValueSelector
};