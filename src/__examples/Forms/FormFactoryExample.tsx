import {DefaultFormFactory} from "../../Factory/DefaultFormFactory";
import TextField from "../Components/TextField";
import {PasswordField} from "../Components/PasswordField";
import Dropdown from "../Components/Dropdown";
import RadioButton, {RadioProps} from "../Components/RadioButton";

export function FormFactoryExample() {
    const factory = new DefaultFormFactory({
        text: TextField,
        password: PasswordField,
        dropdown: Dropdown,
        radio: RadioButton
    });

    return factory.create({
        fieldConfig: {
            comment: {
                type: 'text',
                fieldConfig: {name: 'comment'}
            },
            rating: {
                type: 'radio',
                fieldConfig: {name: 'radio', options: ['Bad', 'Normal', 'Great']} as RadioProps
            }
        },
        formConfig: {
            serviceOptions: {
                submit: {url: 'http://localhost:8080/review'}
            }
        }
    });
}