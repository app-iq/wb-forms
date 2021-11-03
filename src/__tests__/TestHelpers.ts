import {FieldState} from "../Data/Types/FieldState";

export function buildMockField(field?: Partial<FieldState>): FieldState {
    return {
        name: 'test',
        value: '',
        valueSelector: (e: any) => e,
        skipValidation: false,
        valid: true,
        validateOnChange: true,
        validationRules: undefined,
        ...(field ?? {})
    };
}