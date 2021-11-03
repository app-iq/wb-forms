import {ValueSelector} from "../../Field/ValueSelector";

export interface FieldState {
    //general properties
    name: string;


    //value properties
    value: any;
    valueSelector: ValueSelector;


    //validation
    valid: boolean;
    validationRules: any;
    skipValidation: boolean;
    validateOnChange: boolean;


}