import {FieldState} from "../../Data/Types/FieldState";
import {FieldValidator} from "./FieldValidator";

export interface ChangeHandler {
    handle(e: any): void;
}


export interface ChangeHandlerCallbackOptions {
    state: FieldState;
    validator: FieldValidator;
}