import {EasyForm} from "../Root/EasyForm";
import DefaultTextField from "./Components/DefaultTextField";
import {useState} from "react";

export function SimpleExample() {

    const [validationRules, setValidationRules] = useState('^ali$');
    const [initialValue, setInitialValue] = useState('pass');
    const [readonly, setReadonly] = useState(false);
    // setTimeout(() => setValidationRules('^huda$'), 6000);
    // setTimeout(() => setInitialValue('xxxx'), 3000);
    setInterval(() => setReadonly(!readonly), 2000);

    return <EasyForm>
        <DefaultTextField readonly={readonly} name={'test'} initialValue={'ali faris'}/>
        <div>
            <span>Username</span>
            <DefaultTextField name={'username'} initialValue={'ali faris'}/>
        </div>
        <div>
            <span>Password</span>
            <DefaultTextField readonly={readonly} name={'password'} initialValue={initialValue}
                              validationRules={validationRules}/>
        </div>
    </EasyForm>;
}