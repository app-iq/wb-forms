import {FieldProps} from "./FieldProps";
import {Defaults} from "../Defaults/FormDefaults";
import {FieldState} from "../Data/Types/FieldState";


export type FieldInitializeFunc<TProps extends FieldProps> = (props: TProps, defaults: Defaults) => FieldState;

export const defaultInitializeFunc: FieldInitializeFunc<FieldProps> = (props, defaults) => {
    return {
        name: props.name,
        valueSelector: props.valueSelector ?? defaults.valueSelector,
        value: props.initialValue ?? defaults.fieldValue,

        validationRules: props.validationRules ?? undefined,
        skipValidation: props.skipValidation ?? false,
        validateOnChange: props.validateOnChange ?? true,
        valid: props.initialValid ?? true,


        hidden: props.hidden ?? false,
        readonly: props.readonly ?? false,

        clearValue : props.clearValue ?? defaults.clearValue,

        services: {
            fieldValidator: props.fieldValidator,
            changeHandler: props.changeHandler,
        },
    }
}
