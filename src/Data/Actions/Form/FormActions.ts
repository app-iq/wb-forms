import {FormAction, FormActionType} from "./FormAction";
import {UpdatePropertyPayload} from "./Payload";
import {FormState} from "../../Types/RootState";

export class FormActions {
    public static clearValues(): FormAction<undefined> {
        return {
            type: FormActionType.CLEAR,
            payload: undefined
        };
    }


    public static updateProperty(propertyName: keyof FormState, value: any): FormAction<UpdatePropertyPayload> {
        return {
            type: FormActionType.UPDATE_PROPERTY,
            payload: {
                propertyName: propertyName,
                value: value
            }
        }
    }
}