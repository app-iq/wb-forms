import {Form} from "../../Form/Form";
import TextField from "../Components/TextField";
import {DefaultServiceFactory} from "../../Services/ServiceFactory/DefaultServiceFactory";
import {FieldValidator} from "../../Services/Protocol/FieldValidator";
import {useCallback} from "react";

class CustomValidator implements FieldValidator {
    validate(value: any, rules: any): boolean {
        return value === "wbox";
    }
}
class MyCustomServiceFactory extends DefaultServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator {
        return new CustomValidator();
    }
}

export function CustomServiceFactoryExample() {
    const serviceFactoryCallback = useCallback((dispatch, state, props) => new MyCustomServiceFactory(state, dispatch, props) , []);
    return <Form serviceFactoryCallback={serviceFactoryCallback}>
        <h1>Custom Service Factory Example</h1>
        <hr/>
        <p>only the value <b>wbox</b> is valid</p>
        <TextField name={'value 1'} validationRules={true}/>
        <TextField name={'value 2'} validationRules={true}/>
    </Form>
}