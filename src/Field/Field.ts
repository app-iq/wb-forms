export type ValueSelector = (e: any) => any;

export interface Field {
    //general properties
    name: string;


    //value properties
    value: any;
    valueSelector: ValueSelector;
}