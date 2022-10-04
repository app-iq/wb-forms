import {FieldProps} from '../Field/FieldProps';
import TextField from './TextField';
import React from 'react';


export function PasswordField(props: FieldProps) {
    return <TextField name={props.name} inputProps={{type: 'password'}} />;
}
