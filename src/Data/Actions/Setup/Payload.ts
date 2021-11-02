import {FieldState} from "../../Types/FieldState";
import {FieldPayload} from "../Field/FieldAction";

export interface InitializePayload extends FieldPayload {
    field: FieldState;
}