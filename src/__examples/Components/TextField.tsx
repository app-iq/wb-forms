import {FieldProps} from "../../Field/FieldProps";
import {withField, WithFieldProps} from "../../Field/HOCs";

interface Props extends FieldProps, WithFieldProps {
    inputProps?: any;
}

function TextField(props: Props) {
    const {field, handleChange, inputProps} = props;

    return <div style={{padding: '8px 0'}}>
        <label>{field.name}</label>
        <span style={{width: 8, display: 'inline-block'}}/>
        <input name={field.name}
               value={field.value}
               {...(inputProps ?? {})}
               style={{color: !field.valid ? 'red' : undefined}}
               onChange={handleChange}/>
    </div>
}


export default withField(TextField);