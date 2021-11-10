import {FieldProps} from "../../Field/FieldProps";
import TextField from "./TextField";

interface Props extends FieldProps {
}

export function PasswordField(props: Props) {
    return <TextField {...props} inputProps={{type : 'password'}}/>
}
