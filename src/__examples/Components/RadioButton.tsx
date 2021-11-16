import {withField, WithFieldProps} from "../../Field/HOCs";
import {FieldProps} from "../../Field/FieldProps";
import {defaultInitializeFunc} from "../../Field/Helpers";

export interface RadioProps extends FieldProps{
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
                       type={"radio"}/>
                <span style={{width: 8, display: 'inline-block'}}/>
                <label style={{fontWeight: 'bold'}}>{option}</label>
            </div>)
        }
    </div>
}

export default withField(RadioButton, defaultInitializeFunc, {
    valueSelector: (e: any) => e.target.value
});