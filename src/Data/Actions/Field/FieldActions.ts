import {FieldAction, FieldActionType} from "./FieldAction";
import {ChangePropertyPayload, SimpleFieldPayload} from "./Payload";
import {FieldState} from "../../Types/FieldState";

export class FieldActions {

    public static changeValue(fieldName: string, value: any): FieldAction<SimpleFieldPayload<any>> {
        return {
            type: FieldActionType.CHANGE_VALUE,
            payload: {
                name: fieldName,
                value: value,
            }
        };
    }


    public static changeProperty(fieldName: string, propertyName: keyof FieldState, value: any): FieldAction<ChangePropertyPayload> {
        return {
            type: FieldActionType.CHANGE_PROPERTY,
            payload: {
                name: fieldName,
                value: value,
                propertyName: propertyName
            }
        };
    }

    public static changeValidationState(name: string, valid: boolean): FieldAction<SimpleFieldPayload<boolean>> {
        return {
            type: FieldActionType.SET_VALIDATION_STATE,
            payload: {
                name: name,
                value: valid
            }
        };
    }

}