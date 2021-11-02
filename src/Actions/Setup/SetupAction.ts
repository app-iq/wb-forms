import {EasyFormAction} from "../EasyFormAction";

export enum SetupActionType {
    INITIALIZE_FIELD = "INITIALIZE_FIELD"
}

export interface SetupAction<TPayload> extends EasyFormAction<SetupActionType, TPayload> {
}