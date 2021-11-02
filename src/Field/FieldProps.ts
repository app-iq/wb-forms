import {ValueSelector} from "./ValueSelector";

export interface FieldProps {
    name: string;
    valueSelector?: ValueSelector;
    initialValue?: string;
}