import {FieldState} from "../../Types/FieldState";

export interface FieldPayload {
    name: string;
}

export interface SimpleFieldPayload<T> extends FieldPayload {
    value: T;
}

export interface ChangePropertyPayload extends FieldPayload {
    propertyName: keyof FieldState;
    value: any;
}