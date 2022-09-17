import React, {useCallback} from 'react';
import {useServiceFactory} from '../Services/ServiceFactory/Hooks';
import {useState} from '../Form/Hooks';

interface Props {
    title?: string;
}

export function SubmitButton(props: Props) {
    const serviceFactory = useServiceFactory();
    const rootState = useState();
    const onSubmit = useCallback(async () => {
        const formValidator = serviceFactory.createFormValidator();
        if (!formValidator.validate().valid) {
            alert('form is not valid');
            return;
        }
        const submitService = serviceFactory.createSubmitService();
        await submitService.submit();
    }, [serviceFactory, rootState]);
    return <button onClick={(e) => {
        e.preventDefault();
        return onSubmit();
    }}>
        {props.title ?? 'SUBMIT'}
    </button>;
}
