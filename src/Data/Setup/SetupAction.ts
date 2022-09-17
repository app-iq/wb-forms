import {Action} from '../Action';
import {FieldPayload} from '../Field/FieldAction';
import {FieldState} from '../State';

export enum SetupActionType {
    INITIALIZE_FIELD = 'INITIALIZE_FIELD'
}

export type SetupAction<TPayload> = Action<SetupActionType, TPayload>

export interface InitializePayload extends FieldPayload {
    field: FieldState;
}
