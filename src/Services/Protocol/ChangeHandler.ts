import {FieldState} from "../../Data/Types/FieldState";
import {FieldValidator} from "./FieldValidator";

export interface ChangeHandler {
    handle(e: any, listener?: (newValue: any) => void): void;
}


export interface ChangeHandlerCallbackOptions {
    state: FieldState;
    validator: FieldValidator;
}