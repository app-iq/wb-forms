import {ValueSelector} from "./ValueSelector";
import {FieldServices} from "./FieldServices";
import {DispatchFunction} from "../Form/DispatchContext";

export interface FieldProps extends Partial<FieldServices> {
    name: string;
    valueSelector?: ValueSelector;
    initialValue?: string;

    validationRules?: any;
    skipValidation?: boolean;
    validateOnChange?: boolean;
    initialValid?: boolean;


    hidden?: boolean;
    readonly?: boolean;

    onValueChange?: (newValue: any , dispatch : DispatchFunction) => void;


    clearValue?: any;
    value?: never;

}