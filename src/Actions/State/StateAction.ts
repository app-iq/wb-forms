import {EasyFormAction} from "../EasyFormAction";

export enum StateActionType {
    CHANGE_VALUE = "CHANGE_VALUE"
}

export interface StateAction<TPayload> extends EasyFormAction<StateActionType, TPayload>{
}


