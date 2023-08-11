import {useCallback} from 'react';
import {useServiceFactory} from 'wb-core-provider';
import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';
import {ValidationResult} from '../Services/Protocol/FormValidator';
import {useValidateForm} from './UseValidateForm';

export interface UseSubmitOptions {
    onValidationFailed?: (validationResult: ValidationResult) => void;
}

export const useSubmit = (options?: UseSubmitOptions) => {
    const serviceFactory = useServiceFactory<ServiceFactory>();
    const validateForm = useValidateForm();
    return useCallback(() => {
        const validationResult = validateForm();
        if (!validationResult.valid) {
            options?.onValidationFailed?.(validationResult);
            return;
        }
        const submitService = serviceFactory.createSubmitService();
        submitService.submit();
    }, [validateForm, serviceFactory, options]);
};
