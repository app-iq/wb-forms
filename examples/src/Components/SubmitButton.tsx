import { useCallback } from 'react';
import { useServiceFactory } from 'wb-core-provider';
import { ServiceFactory } from 'wb-forms';

interface Props {
    title?: string;
}

export function SubmitButton(props: Props) {
    const serviceFactory = useServiceFactory<ServiceFactory>();
    const onSubmit = useCallback(async () => {
        const formValidator = serviceFactory.createFormValidator();
        if (!formValidator.validate().valid) {
            alert('form is not valid');
            return;
        }
        const submitService = serviceFactory.createSubmitService();
        await submitService.submit();
    }, [serviceFactory]);
    return (
        <button
            onClick={e => {
                e.preventDefault();
                return onSubmit();
            }}
        >
            {props.title ?? 'SUBMIT'}
        </button>
    );
}
