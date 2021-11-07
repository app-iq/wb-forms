import {FormFactory} from "./FormFactory";
import {FieldTypeMap, FormConfiguration} from "./FormFactoryConfigurationBase";
import React, {ReactElement} from "react";
import {FieldProps} from "../Field/FieldProps";
import {Form} from "../Form/Form";

export class DefaultFormFactory<TFieldTypeMap extends FieldTypeMap, TFieldProps extends FieldProps = FieldProps, TExtraOptions = any>
    implements FormFactory<FormConfiguration<TFieldTypeMap, TFieldProps, TExtraOptions>> {

    protected readonly fieldTypeMap: TFieldTypeMap;

    public constructor(fieldComponents: TFieldTypeMap) {
        this.fieldTypeMap = fieldComponents;
    }

    create(configuration: FormConfiguration<TFieldTypeMap, TFieldProps, TExtraOptions>): React.ReactElement {
        const formProps = configuration.formConfig;
        return <Form {...formProps}>
            {
                this.renderFields(configuration)
            }
        </Form>;
    }


    protected getFieldElement(type: keyof TFieldTypeMap, fieldProps: TFieldProps) {
        const FieldComponent = this.fieldTypeMap[type];
        return <FieldComponent key={fieldProps.name} {...fieldProps} />;
    }

    protected renderFields(configuration: FormConfiguration<TFieldTypeMap, TFieldProps, TExtraOptions>): ReactElement | ReactElement[] {
        const fields = configuration.fieldConfig;
        const keys = Object.keys(fields);
        return keys.map(key => {
            const fieldProps = fields[key].fieldConfig;
            const type = fields[key].type;
            return this.getFieldElement(type, fieldProps);
        });
    }


}