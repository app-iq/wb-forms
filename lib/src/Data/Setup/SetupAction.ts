import {FieldPayload} from '../Field/FieldAction';
import {FieldState} from '../State';
import {Action} from 'wb-core-provider';

export enum SetupActionType {
    INITIALIZE_FIELD = 'INITIALIZE_FIELD'
}

export type SetupAction<TPayload> = Action<SetupActionType, TPayload>

export interface InitializePayload extends FieldPayload {
    field: FieldState;
}
