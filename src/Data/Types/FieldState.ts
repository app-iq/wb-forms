import {ValueSelector} from "../../Field/ValueSelector";
import {FieldServices} from "../../Field/FieldServices";

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


    //ui
    readonly: boolean;
    hidden: boolean;


    services: Partial<FieldServices>;

    [propertyName: string]: any;

}