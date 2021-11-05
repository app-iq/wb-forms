import {textValueSelector, ValueSelector} from "../Field/ValueSelector";

export interface Defaults {
    fieldValue: string;
    valueSelector: ValueSelector;
}

export const formDefaults: Defaults = {
    fieldValue: '',
    valueSelector: textValueSelector
};