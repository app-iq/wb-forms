import {FieldProps} from "../../Field/FieldProps";
import {withField, WithFieldProps} from "../../Field/HOCs";

interface Props extends FieldProps, WithFieldProps {
    options : string[];
}

function DefaultDropdownField(props: Props) {
    const {field, handleChange} = props;
    return <select name={field.name}
                   value={field.value}
                   style={{color: !field.valid ? 'red' : undefined}}
                   onChange={handleChange}>
        {
            props.options.map(o => <option key={o} value={o}>{o}</option>)
        }
    </select>
}


export default withField(DefaultDropdownField);