import React, { useContext } from 'react';
import { FieldConfiguration } from './FieldProps';

type FieldConfigContextState = Record<string, FieldConfiguration>;

export const FieldConfigurationContext = React.createContext<FieldConfigContextState>({});

export const useFieldConfiguration = (fieldName: string) => {
    const configuration = useContext(FieldConfigurationContext);
    return configuration[fieldName];
};
