import {Action} from "../Action";

export enum FormActionType {
    CLEAR = "FORM_CLEAR",
    UPDATE_PROPERTY = "FORM_UPDATE_PROPERTY",
}

export interface FormAction<TPayload> extends Action<FormActionType, TPayload> {

}