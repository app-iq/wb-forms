import {FormProps} from "../Form/FormProps";
import {FieldProps} from "../Field/FieldProps";

export type FieldTypeMap = {
    [fieldType: string]: any
}

export interface FieldConfig<TFieldTypeMap, TFieldProps extends FieldProps = FieldProps> {
    type: keyof TFieldTypeMap;
    fieldConfig: TFieldProps;
}

export interface FormConfiguration<TFieldTypeMap extends FieldTypeMap = FieldTypeMap, TFieldProps extends FieldProps = FieldProps, TExtraOptions = any> {
    formConfig: Omit<FormProps, "children">;
    fieldConfig: {
        [name: string]: FieldConfig<TFieldTypeMap, TFieldProps>;
    };
    extraOptions?: TExtraOptions;
}

