import {FieldProps} from "./FieldProps";
import {Defaults} from "../Defaults/EasyFormDefaults";
import {FieldState} from "../Data/Types/FieldState";


export function buildFieldWithInitialState(props: FieldProps, defaults: Defaults): FieldState {
    return {
        name: props.name,
        valueSelector: props.valueSelector ?? defaults.valueSelector,
        value: props.initialValue ?? defaults.fieldValue,

        validationRules: props.validationRules ?? undefined,
        skipValidation: props.skipValidation ?? false,
        validateOnChange: props.validateOnChange ?? true,
        valid: props.initialValid ?? true

    }
}