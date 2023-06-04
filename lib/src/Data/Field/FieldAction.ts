import { Action } from 'wb-core-provider';

export enum FieldActionType {
    CHANGE_VALUE = 'CHANGE_VALUE',
    SET_VALIDATION_STATE = 'SET_VALIDATION_STATE',
    SET_CUSTOM_VALUE = 'FIELD_ACTION@SET_CUSTOM_VALUE',
    SET_READY = 'SET_READY',
}

export interface FieldPayload {
    name: string;
}

export type FieldAction<TPayload extends FieldPayload> = Action<FieldActionType, TPayload>;

export interface SimpleFieldPayload<T> extends FieldPayload {
    value: T;
}

export interface SetCustomValuePayload extends SimpleFieldPayload<unknown> {
    propertyName: string;
}
