import {ValueSelector} from "./ValueSelector";
import {FieldState} from "../Data/Types/FieldState";
import {FieldServices} from "../Services/Services";

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


    skipCollect?: boolean;
    collectCallback?: (field: FieldState) => any;

}