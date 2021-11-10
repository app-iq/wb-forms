import {useCallback} from "react";
import {useServiceFactory} from "../../Services/ServiceFactory/Hooks";
import {useRootState} from "../../Form/Hooks";

interface Props {
    title?: string;
    validateBeforeSubmit?: boolean;
}

export function SubmitButton(props: Props) {
    const serviceFactory = useServiceFactory();
    const rootState = useRootState();
    const onSubmit = useCallback(async () => {
        const submitService = serviceFactory.createSubmitService();
        const fieldNames = Object.keys(rootState.fields);
        if (props.validateBeforeSubmit) {
            const valid = fieldNames.reduce((v, fieldName) => {
                const field = rootState.fields[fieldName];
                if (field) {
                    const validator = serviceFactory.createFieldValidator(field.name);
                    return v && validator.validate(field.value, field.validationRules);
                }
                return v;
            }, true);
            if (!valid) {
                alert('form is not valid');
                return;
            }

            await submitService.submit();
        }
    }, [serviceFactory, rootState, props.validateBeforeSubmit]);
    return <button onClick={async (e) => {
        e.preventDefault();
        await onSubmit();
    }}>{props.title ?? "SUBMIT"}</button>
}