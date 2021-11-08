import {Action} from "../Action";
import {FieldPayload} from "./Payload";

export enum FieldActionType {
    CHANGE_VALUE = "CHANGE_VALUE",
    CHANGE_PROPERTY = "CHANGE_PROPERTY",
    SET_VALIDATION_STATE = "SET_VALIDATION_STATE",
}

export interface FieldAction<TPayload extends FieldPayload> extends Action<FieldActionType, TPayload> {
}
