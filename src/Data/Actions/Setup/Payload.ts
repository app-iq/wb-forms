import {FieldState} from "../../../Field/FieldState";
import {FieldPayload} from "../Payload";

export interface InitializePayload extends FieldPayload {
    field: FieldState;
}