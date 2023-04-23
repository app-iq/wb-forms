// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldValue = any;

export interface FieldState {
    value: FieldValue;
    valid: boolean | boolean[];
    ready: boolean;

    [propertyName: string]: unknown;
}

export type FieldsState = Record<string, FieldState>;

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

export const INITIAL_STATE: State = {
    fields: {},
    form: {
        loading: false,
    },
};
