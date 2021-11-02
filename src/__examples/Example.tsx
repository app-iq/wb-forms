import {EasyForm} from "../Root/EasyForm";
import DefaultTextField from "../DefaultComponents/DefaultTextField";
import {FieldGroup} from "../Field/FieldGroup";

export function SimpleExample() {
    return <EasyForm>
        <FieldGroup>
            <DefaultTextField name={'username'}/>
            <DefaultTextField name={'password'}/>
        </FieldGroup>
        <DefaultTextField name={'username'}/>
        <DefaultTextField name={'password'}/>
        <FieldGroup>
            <DefaultTextField name={'username'}/>
            <DefaultTextField name={'password'}/>
        </FieldGroup>
        <FieldGroup>
            <DefaultTextField name={'username'}/>
        </FieldGroup>
        <DefaultTextField name={'username'}/>
        <DefaultTextField name={'password'}/>
    </EasyForm>;
}