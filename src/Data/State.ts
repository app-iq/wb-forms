// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldValue = any;

export interface FieldState {
    value: FieldValue;
    valid: boolean;

    [propertyName: string]: unknown;
}

export type FieldsState = Record<string, FieldState>

export interface FormState {
    loading: boolean;
    error?: unknown;
    response?: unknown;

    [propertyName: string]: unknown;
}

export interface State {
    fields: FieldsState;
    form: FormState;
}
