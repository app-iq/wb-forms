import {ValueSelector} from "./ValueSelector";
import {FieldServices} from "./FieldServices";

export interface FieldProps extends Partial<FieldServices> {
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

    onValueChange?: (newValue: any) => void;


    clearValue? : any;
    value?: never;

    [propName: string]: any;
}