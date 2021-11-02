import {EasyFormAction} from "./EasyFormAction";
import {Field} from "../Field/Field";

export enum SetupActionType {
    INITIALIZE_FIELD = "INITIALIZE_FIELD"
}


export interface SetupAction<TPayload> extends EasyFormAction<SetupActionType, TPayload> {
}


export class SetupActions {
    public static initializeField(name: string , field : Field): SetupAction<InitializePayload> {
        return {
            type: SetupActionType.INITIALIZE_FIELD,
            payload: {
                name : name,
                field : field
            }
        }
    }
}

export interface FieldPayload {
    name: string;
}

export interface InitializePayload extends FieldPayload {
    field : Field;
}