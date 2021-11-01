import {EasyFormAction} from "./EasyFormAction";

export enum SetupActionType {
    INITIALIZE_FIELD = "INITIALIZE_FIELD"
}


export interface SetupAction<TPayload> extends EasyFormAction<SetupActionType, TPayload> {
}


export class SetupActions {
    public static initializeField(name: string): SetupAction<string> {
        return {
            type: SetupActionType.INITIALIZE_FIELD,
            payload: name
        }
    }
}