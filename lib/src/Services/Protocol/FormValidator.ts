export interface ValidationResult {
    valid: boolean;
    failedFields: string[];
}

export interface FormValidator {
    validate(): ValidationResult;
}
