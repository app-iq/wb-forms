import { Action } from 'wb-core-provider';

export enum FormActionType {
    CLEAR = 'FORM_CLEAR',
    SET_CUSTOM_VALUE = 'FORM_ACTION@SET_CUSTOM_VALUE',
}

export type FormAction<TPayload> = Action<FormActionType, TPayload>;

export interface SetCustomValuePayload {
    name: string;
    value: unknown;
}
