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
        valid: props.initialValid ?? true,


        disableOnFormLoading: props.disableOnFormLoading ?? true,
        disabled: props.disabled ?? false,
        hidden: props.hidden ?? false,
        readonly: props.readonly ?? false,

        skipCollect: props.skipCollect ?? false,
        collectCallback: props.collectCallback ?? (field => field.value),


        services: {
            fieldValidator: props.fieldValidator,
            changeHandler: props.changeHandler,
        },

    }
}