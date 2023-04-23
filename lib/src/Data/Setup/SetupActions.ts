import {InitializePayload, SetupAction, SetupActionType} from './SetupAction';
import {FieldState} from '../State';

export class SetupActions {
    public static initializeField(name: string, field: FieldState): SetupAction<InitializePayload> {
        return {
            type: SetupActionType.INITIALIZE_FIELD,
            payload: {
                name: name,
                field: field
            }
        };
    }
}
