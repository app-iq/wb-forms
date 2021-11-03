import {EasyForm} from "../Root/EasyForm";
import DefaultTextField from "../Components/DefaultTextField";

export function SimpleExample() {
    return <EasyForm>
        <DefaultTextField name={'username'} initialValue={'ali faris'}/>
        <DefaultTextField name={'password'} validationRules={'^\\d{4,8}$'}/>
    </EasyForm>;
}