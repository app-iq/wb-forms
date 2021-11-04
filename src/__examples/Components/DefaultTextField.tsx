import {FieldProps} from "../../Field/FieldProps";
import {withField, WithFieldProps} from "../../Field/WithField";

interface Props extends FieldProps, WithFieldProps {
}

function DefaultTextField(props: Props) {
    const {field, handleChange} = props;
    return <input name={field.name}
                  value={field.value}
                  style={{color: !field.valid ? 'red' : undefined}}
                  onChange={handleChange}/>
}


export default withField(DefaultTextField);