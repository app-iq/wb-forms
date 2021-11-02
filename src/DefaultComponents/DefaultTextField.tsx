import {FieldProps} from "../Field/FieldProps";
import {withField, WithFieldProps} from "../Field/WithField";

interface Props extends FieldProps , WithFieldProps{
}

function DefaultTextField(props : Props) {
    const {field , handleChange} = props;
    return <input name={field.configuration.name}
                  value={field.state.value}
                  onChange={handleChange}/>
}


export default withField(DefaultTextField);