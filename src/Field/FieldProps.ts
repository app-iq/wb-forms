import {ValueSelector} from "./ValueSelector";

export interface FieldProps {
    name: string;
    valueSelector?: ValueSelector;
    initialValue?: string;

    validationRules?: any;
    skipValidation?: boolean;
    validateOnChange?: boolean;
    initialValid?: boolean;


    disableOnFormLoading?: boolean;
    hidden?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}