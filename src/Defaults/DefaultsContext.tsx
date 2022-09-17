import React from 'react';
import {textValueSelector, ValueSelector} from '../Field/ValueSelector';
import {FieldValue} from '../Data/State';

export interface Defaults {
    clearValue: FieldValue;
    fieldValue: string;
    valueSelector: ValueSelector;
}

export const formDefaults: Defaults = {
    fieldValue: '',
    clearValue: '',
    valueSelector: textValueSelector
};

export const DefaultsContext = React.createContext<Defaults>(formDefaults);
export const DefaultsProvider = DefaultsContext.Provider;

export function useDefaults(): Defaults {
    return React.useContext(DefaultsContext);
}
