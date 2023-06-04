import { FormProps } from '../Form/FormProps';
import { FieldProps } from '../Field/FieldProps';

export interface FieldOptions {
    type: string;
    options: FieldProps & { [propName: string]: unknown };
}

export interface FormOptions<TExtraOptions = unknown> {
    formOptions: Omit<FormProps, 'children'>;
    fields: Record<string, FieldOptions>;
    extraOptions: TExtraOptions;
}
