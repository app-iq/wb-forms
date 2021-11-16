import {FieldProps} from "../../Field/FieldProps";
import TextField from "./TextField";
import {WithFieldProps} from "../../Field/HOCs";

interface Props extends FieldProps  {
}

export function PasswordField(props: Props) {
    return <TextField name={props.name} />
}
