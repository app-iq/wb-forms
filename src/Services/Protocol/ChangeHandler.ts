import {FieldState} from "../../Data/Types/FieldState";
import {FieldValidator} from "./FieldValidator";
import {DispatchFunction} from "../../Form/DispatchContext";

export interface ChangeHandler {
    handle(e: any, listener?: (newValue: any, dispatch: DispatchFunction) => void): void;
}


export interface ChangeHandlerCallbackOptions {
    state: FieldState;
    validator: FieldValidator;
}