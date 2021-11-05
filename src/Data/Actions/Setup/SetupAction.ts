import {Action} from "../Action";

export enum SetupActionType {
    INITIALIZE_FIELD = "INITIALIZE_FIELD"
}

export interface SetupAction<TPayload> extends Action<SetupActionType, TPayload> {
}