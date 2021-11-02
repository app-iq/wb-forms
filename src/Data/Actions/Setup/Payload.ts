import {FieldState} from "../../../Field/FieldState";
import {FieldPayload} from "../Field/FieldAction";

export interface InitializePayload extends FieldPayload {
    field: FieldState;
}