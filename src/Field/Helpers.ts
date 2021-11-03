import {FieldProps} from "./FieldProps";
import {Defaults} from "../Defaults/EasyFormDefaults";
import {FieldState} from "../Data/Types/FieldState";


export function buildFieldWithInitialState(props: FieldProps, defaults: Defaults): FieldState {
    return {
        name: props.name,
        valueSelector: props.valueSelector ?? defaults.valueSelector,
        value: props.initialValue ?? defaults.fieldValue
    }
}