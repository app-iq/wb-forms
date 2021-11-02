import {StateAction, StateActionType} from "./StateAction";
import {SimpleFieldPayload} from "../Payload";

export class StateActions {
    public static changeValue(fieldName: string, value: any): StateAction<SimpleFieldPayload<any>> {
        return {
            type: StateActionType.CHANGE_VALUE,
            payload: {
                name: fieldName,
                value: value,
            }
        }
    }
}