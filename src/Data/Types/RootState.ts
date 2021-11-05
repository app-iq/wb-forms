import {FieldState} from "./FieldState";

export type FieldsState = { [fieldName: string]: FieldState }

export interface FormState {
    loading: boolean;
    error?: any;
    response?: any;

    [propName: string]: any;
}

export interface RootState {
    fields: FieldsState;
    form: FormState;
}