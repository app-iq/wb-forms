import {FieldState} from "../Data/Types/FieldState";
import {FormState} from "../Data/Types/RootState";


export function buildMockFieldState(field?: Partial<FieldState>): FieldState {
    return {
        name: 'test',
        value: '',
        valueSelector: (e: any) => e,
        skipValidation: false,
        valid: true,
        validateOnChange: true,
        validationRules: undefined,
        readonly: false,
        hidden: false,
        clearValue: '',
        services: {
            fieldValidator: undefined,
            changeHandler: undefined
        },
        ...(field ?? {})
    };
}


export function buildMockFormState(form?: Partial<FormState>): FormState {
    return {
        loading: false,
        response: null,
        error: null,
        ...(form ?? {})
    }
}