import {EasyFormAction} from "../EasyFormAction";

export enum FormActionType {
    CLEAR = "FORM_CLEAR"
}

export interface FormAction<TPayload> extends EasyFormAction<FormActionType, TPayload> {

}