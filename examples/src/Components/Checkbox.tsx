import { FieldProps, WithFieldProps, checkboxValueSelector, withField } from 'wb-forms';

export interface RadioProps extends FieldProps {
    label: string;
}

interface Props extends RadioProps, WithFieldProps {
}

function _Checkbox(props: Props) {
    const {handleChange, field, label} = props;
    return <div>
        <input name={props.name}
               value={field.value}
               onChange={handleChange}
               checked={field.value}
               type={'checkbox'}/>
        <span style={{width: 8, display: 'inline-block'}}/>
        <label style={{fontWeight: 'bold'}}>{label}</label>
    </div>;
}

export const Checkbox = withField(_Checkbox, checkboxValueSelector);
