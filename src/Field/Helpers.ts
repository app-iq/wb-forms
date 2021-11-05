import {FieldProps} from "./FieldProps";
import {Defaults} from "../Defaults/FormDefaults";
import {FieldState} from "../Data/Types/FieldState";


export type FieldInitializeFunc<Props> = (props: Props, defaults: Defaults) => FieldState;

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

        services: {
            fieldValidator: props.fieldValidator,
            changeHandler: props.changeHandler,
        },
    }
}
