import {EasyFormAction} from "../EasyFormAction";

export enum FieldActionType {
    CHANGE_VALUE = "CHANGE_VALUE"
}

export interface FieldPayload {
    name: string;
}

export interface FieldAction<TPayload extends FieldPayload> extends EasyFormAction<FieldActionType, TPayload> {
}


