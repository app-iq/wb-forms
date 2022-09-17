import {withField, WithFieldProps} from '../Field/WithField';
import {FieldProps} from '../Field/FieldProps';
import React from 'react';


export interface RadioProps extends FieldProps {
    options: string[];
}

interface Props extends RadioProps, WithFieldProps {
}

function RadioButton(props: Props) {
    const {handleChange, field, options} = props;
    return <div>
        {
            options.map(option => <div key={option}>
                <input name={props.name}
                       value={option}
                       onChange={handleChange}
                       checked={option === field.value}
                       type={'radio'}/>
                <span style={{width: 8, display: 'inline-block'}}/>
                <label style={{fontWeight: 'bold'}}>{option}</label>
            </div>)
        }
    </div>;
}

export default withField(RadioButton);
