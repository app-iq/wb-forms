import {FieldProps} from "../Field/FieldProps";

export function DefaultTextField({name} : FieldProps) {
    return <input name={name} placeholder={name} />
}