import {FieldProps} from "../../Field/FieldProps";
import {FieldState} from "../../Data/Types/FieldState";

export interface StateUpdater {
    update(field: FieldState, props: FieldProps): void;
}