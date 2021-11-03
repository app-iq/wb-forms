import {FieldState} from "../../Types/FieldState";
import {FieldPayload} from "../Field/Payload";

export interface InitializePayload extends FieldPayload {
    field: FieldState;
}