import {FieldState} from "../../Field/FieldState";
import {SetupAction, SetupActionType} from "./SetupAction";
import {InitializePayload} from "./Payload";

export class SetupActions {
    public static initializeField(name: string, field: FieldState): SetupAction<InitializePayload> {
        return {
            type: SetupActionType.INITIALIZE_FIELD,
            payload: {
                name: name,
                field: field
            }
        }
    }
}
