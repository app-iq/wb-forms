import {ValueSelector} from "./Field";

export interface FieldProps {
    name: string;
    valueSelector?: ValueSelector;
    initialValue?: string;
}