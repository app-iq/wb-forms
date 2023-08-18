import React, {ReactElement, useCallback} from 'react';
import {useServiceFactory} from 'wb-core-provider';
import {FormFactory} from './FormFactory.ts';
import {FormOptions} from './DefaultFormFactoryConfiguration.ts';
import {FieldProps} from '../../../lib/src/Field/FieldProps';
import {Form} from '../../../lib/src/Form/Form.tsx';
import {ServiceFactory} from '../../../lib/src/Services/ServiceFactory/ServiceFactory.ts';

function SubmitButton() {
    const serviceFactory = useServiceFactory<ServiceFactory>();
    const onClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            const submit = serviceFactory.createSubmitService();
            submit.submit().then();
        },
        [serviceFactory],
    );
    return (
        <button type="button" onClick={onClick}>
            SUBMIT
        </button>
    );
}

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
        const {fields} = configuration;
        const keys = Object.keys(fields);
        return keys.map(key => {
            const fieldProps = fields[key].options;
            const {type} = fields[key];
            return this.getFieldElement(type, fieldProps);
        });
    }

    protected renderButton(): ReactElement {
        return <SubmitButton />;
    }
}
