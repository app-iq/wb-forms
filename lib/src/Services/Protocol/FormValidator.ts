export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export interface FormValidator {
    validate(): ValidationResult;
}
