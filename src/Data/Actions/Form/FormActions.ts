import {FormAction, FormActionType} from "./FormAction";

export class FormActions {
    public static clearValues(): FormAction<undefined> {
        return {
            type: FormActionType.CLEAR,
            payload: undefined
        };
    }
}