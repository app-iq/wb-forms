import { WithFieldProps } from '../Field/BaseFieldComponent';
import {FieldProps} from '../Field/FieldProps';
import {withField} from '../Field/WithField';
import React from 'react';

interface Props extends FieldProps, WithFieldProps {
    inputProps?: unknown;
}

function TextField(props: Props) {
    const {name, field, handleChange, inputProps} = props;

    return <div style={{padding: '8px 0'}}>
        <label>{name}</label>
        <span style={{width: 8, display: 'inline-block'}}/>
        <input name={name}
               value={field.value}
               {...(inputProps ?? {})}
               style={{color: !field.valid ? 'red' : undefined}}
               onChange={handleChange}/>
    </div>;
}


export default withField(TextField);
