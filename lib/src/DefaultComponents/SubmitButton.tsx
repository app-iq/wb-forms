import React, {useCallback} from 'react';
import {useServiceFactory, useState} from 'wb-core-provider';
import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';

interface Props {
    title?: string;
}

export function SubmitButton(props: Props) {
    const serviceFactory = useServiceFactory<ServiceFactory>();
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
