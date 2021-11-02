import {ValueSelector} from "./ValueSelector";

export interface FieldState {
    //general properties
    name: string;


    //value properties
    value: any;
    valueSelector: ValueSelector;
}