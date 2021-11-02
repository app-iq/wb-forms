export interface FieldPayload {
    name: string;
}

export interface SimpleFieldPayload<T> extends FieldPayload {
    value: T;
}