import { Action } from 'wb-core-provider';

export enum SubmitActionType {
    SUBMIT_START = 'SUBMIT_START',
    SUBMIT_FAIL = 'SUBMIT_FAIL',
    SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
    SUBMIT_COMPLETE = 'SUBMIT_COMPLETE',
}

export type SubmitAction<TPayload> = Action<SubmitActionType, TPayload>;
