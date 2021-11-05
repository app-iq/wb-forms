import {Action} from "../Action";
import {FieldPayload} from "./Payload";

export enum FieldActionType {
    CHANGE_VALUE = "CHANGE_VALUE",
    CHANGE_PROPERTY = "CHANGE_PROPERTY",
    VALIDATE = "VALIDATE",
}

export interface FieldAction<TPayload extends FieldPayload> extends Action<FieldActionType, TPayload> {
}
