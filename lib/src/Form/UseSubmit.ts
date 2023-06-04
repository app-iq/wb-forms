import { useCallback } from 'react';
import { useServiceFactory } from 'wb-core-provider';
import { ServiceFactory } from '../Services/ServiceFactory/ServiceFactory';
import { ValidationResult } from '../Services/Protocol/FormValidator';

export interface UseSubmitOptions {
    onValidationFailed?: (validationResult: ValidationResult) => void;
}

export const useSubmit = (options?: UseSubmitOptions) => {
    const serviceFactory = useServiceFactory<ServiceFactory>();
    return useCallback(async () => {
        const formValidator = serviceFactory.createFormValidator();
        if (!formValidator.validate().valid) {
            options?.onValidationFailed?.(formValidator.validate());
            return;
        }
        const submitService = serviceFactory.createSubmitService();
        await submitService.submit();
    }, [serviceFactory, options]);
};
