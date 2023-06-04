import { FormFactory } from './FormFactory';
import { FormOptions } from './DefaultFormFactoryConfiguration';
import React, { ReactElement, useCallback } from 'react';
import { FieldProps } from '../Field/FieldProps';
import { Form } from '../Form/Form';
import { useServiceFactory } from 'wb-core-provider';
import { ServiceFactory } from '../Services/ServiceFactory/ServiceFactory';

export class DefaultFormFactory<TExtraOptions = unknown> implements FormFactory<FormOptions<TExtraOptions>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected readonly fieldTypeMap: Record<string, React.ComponentType<any>>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(fieldComponents: Record<string, React.ComponentType<any>>) {
        this.fieldTypeMap = fieldComponents;
    }

    create(configuration: FormOptions<TExtraOptions>): React.ReactElement {
        const formProps = configuration.formOptions;
        return (
            <Form {...formProps}>
                {this.renderFields(configuration)}
                {this.renderButton()}
            </Form>
        );
    }

    protected getFieldElement(type: string, fieldProps: FieldProps) {
        const FieldComponent = this.fieldTypeMap[type];
        return <FieldComponent key={fieldProps.name} {...fieldProps} />;
    }

    protected renderFields(configuration: FormOptions<TExtraOptions>): ReactElement | ReactElement[] {
        const fields = configuration.fields;
        const keys = Object.keys(fields);
        return keys.map(key => {
            const fieldProps = fields[key].options;
            const type = fields[key].type;
            return this.getFieldElement(type, fieldProps);
        });
    }

    protected renderButton(): ReactElement {
        return <SubmitButton />;
    }
}

function SubmitButton() {
    const serviceFactory = useServiceFactory<ServiceFactory>();
    const onClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const submit = serviceFactory.createSubmitService();
        submit.submit().then();
    }, []);
    return <button onClick={onClick}>SUBMIT</button>;
}
