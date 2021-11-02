import {FieldAction, FieldActionType} from "./FieldAction";
import {SimpleFieldPayload} from "../Payload";

export class FieldActions {
    public static changeValue(fieldName: string, value: any): FieldAction<SimpleFieldPayload<any>> {
        return {
            type: FieldActionType.CHANGE_VALUE,
            payload: {
                name: fieldName,
                value: value,
            }
        }
    }
}