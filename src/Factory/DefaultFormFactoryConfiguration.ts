import {FormProps} from "../Form/FormProps";
import {FieldProps} from "../Field/FieldProps";

export type FieldTypeMap = {
    [fieldType: string]: any
}


export interface FieldConfig<TFieldProps extends FieldProps = FieldProps> {
    type: keyof FieldTypeMap;
    fieldConfig: TFieldProps;
}

export interface FormConfiguration<TFieldProps extends FieldProps = FieldProps, TExtraOptions = any> {
    formConfig: Omit<FormProps, "children">;
    fieldConfig: {
        [name: string]: FieldConfig<TFieldProps>;
    };
    extraOptions: TExtraOptions;
}

