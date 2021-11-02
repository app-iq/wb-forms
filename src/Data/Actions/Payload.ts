import {FieldPayload} from "./Field/FieldAction";

export interface SimpleFieldPayload<T> extends FieldPayload {
    value: T;
}