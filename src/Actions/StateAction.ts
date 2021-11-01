import {EasyFormAction} from "./EasyFormAction";

export enum StateActionType {
    CHANGE_VALUE = "CHANGE_VALUE"
}

export interface StateAction<TPayload> extends EasyFormAction<StateActionType, TPayload>{
}


export class StateActions {
    public static changeValue(fieldName : string, value : string)  : StateAction<any>{
        return {
            type : StateActionType.CHANGE_VALUE,
            payload : {
                fieldName : fieldName,
                value : value,
            }
        }
    }
}