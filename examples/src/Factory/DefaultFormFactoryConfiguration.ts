import {FormProps} from '../../../lib/src/Form/FormProps.ts';
import {FieldProps} from '../../../lib/src/Field/FieldProps.ts';

export interface FieldOptions {
    type: string;
    options: FieldProps & {[propName: string]: unknown};
}

export interface FormOptions<TExtraOptions = unknown> {
    formOptions: Omit<FormProps, 'children'>;
    fields: Record<string, FieldOptions>;
    extraOptions: TExtraOptions;
}
