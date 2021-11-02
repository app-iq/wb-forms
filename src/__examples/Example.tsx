import {EasyForm} from "../Root/EasyForm";
import DefaultTextField from "../DefaultComponents/DefaultTextField";
import {FieldGroup} from "../Field/FieldGroup";

export function SimpleExample() {
    return <EasyForm>
        <DefaultTextField name={'username'} initialValue={'ali faris'}/>
        <DefaultTextField name={'password'}/>
    </EasyForm>;
}