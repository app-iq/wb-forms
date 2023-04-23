import { WithFieldProps } from '../Field/BaseFieldComponent';
import {FieldProps} from '../Field/FieldProps';
import {withField} from '../Field/WithField';
import React from 'react';

interface Props extends FieldProps, WithFieldProps {
    options: string[];
}

function Dropdown(props: Props) {
    const {name, field, handleChange} = props;
    return <select name={name}
                   value={field.value}
                   style={{
                       display: 'block',
                       color: !field.valid ? 'red' : undefined
                   }}
                   onChange={handleChange}>
        {
            props.options.map(o => <option key={o} value={o}>{o}</option>)
        }
    </select>;
}


export default withField(Dropdown);
