import {FieldState, FormState} from '../../Data/State';

export function buildMockFieldState(field?: Partial<FieldState>): FieldState {
    return {
        value: '',
        valid: true,
        ready: true,
        ...(field ?? {}),
    };
}

export function buildMockFormState(form?: Partial<FormState>): FormState {
    return {
        loading: false,
        response: null,
        error: null,
        ...(form ?? {}),
    };
}
