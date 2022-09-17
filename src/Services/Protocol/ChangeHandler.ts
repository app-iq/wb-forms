import {FieldValidator} from './FieldValidator';
import {DispatchFunction} from '../../Form/DispatchContext';
import {FieldState, FieldValue} from '../../Data/State';

export interface ChangeHandler {
    handle(e: unknown, listener?: (newValue: FieldValue, dispatch: DispatchFunction) => void): void;
}


export interface ChangeHandlerCallbackOptions {
    state: FieldState;
    validator: FieldValidator;
}
