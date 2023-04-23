import {withField} from '../Field/WithField';
import {FieldProps} from '../Field/FieldProps';
import React from 'react';
import {checkboxValueSelector} from '../Field/ValueSelector';
import { WithFieldProps } from '../Field/BaseFieldComponent';


export interface RadioProps extends FieldProps {
    label: string;
}

interface Props extends RadioProps, WithFieldProps {
}

function Checkbox(props: Props) {
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

export default withField(Checkbox, checkboxValueSelector);
