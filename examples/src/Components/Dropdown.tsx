import { FieldProps, WithFieldProps, withField } from 'wb-forms';


interface Props extends FieldProps, WithFieldProps {
    options: string[];
}

function _Dropdown(props: Props) {
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


export const Dropdown = withField(_Dropdown);
