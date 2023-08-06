import {DispatchFunction} from 'wb-core-provider';
import {FieldValidator} from './FieldValidator';
import {FieldState, FieldValue} from '../../Data/State';

export interface ChangeHandler {
    handle(e: unknown, listener?: (newValue: FieldValue, dispatch: DispatchFunction) => void): void;
}

export interface ChangeHandlerCallbackOptions {
    state: FieldState;
    validator: FieldValidator;
}
