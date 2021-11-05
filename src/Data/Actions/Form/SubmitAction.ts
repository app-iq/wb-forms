import {EasyFormAction} from "../EasyFormAction";

export enum SubmitActionType {
    SUBMIT_START = "SUBMIT_START",
    SUBMIT_FAIL = "SUBMIT_FAIL",
    SUBMIT_SUCCESS = "SUBMIT_SUCCESS",
    SUBMIT_COMPLETE = "SUBMIT_COMPLETE"
}

export interface SubmitAction<TPayload> extends EasyFormAction<SubmitActionType, TPayload> {
}