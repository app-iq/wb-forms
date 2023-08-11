import {useServiceFactory} from 'wb-core-provider';
import {useCallback} from 'react';
import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';

export const useValidateForm = () => {
    const serviceFactory = useServiceFactory<ServiceFactory>();
    return useCallback(() => {
        const formValidator = serviceFactory.createFormValidator();
        return formValidator.validate();
    }, [serviceFactory]);
};
