import {EasyForm} from "../Root/EasyForm";
import {DefaultTextField} from "../DefaultComponents/DefaultTextField";

export function SimpleExample() {
    return <EasyForm>
        <DefaultTextField name={'username'}/>
        <DefaultTextField name={'password'}/>
    </EasyForm>;
}