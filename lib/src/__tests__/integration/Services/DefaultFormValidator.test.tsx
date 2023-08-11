import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {useServiceFactory} from 'wb-core-provider';
import {FieldProps} from '../../../Field/FieldProps';
import {withArrayField, WithArrayFieldProps} from '../../../Field/WithArrayField';
import {FieldValue} from '../../../Data/State';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {Form} from '../../../Form/Form';
import {ServiceFactory} from '../../../Services/ServiceFactory/ServiceFactory';

function ArrayField({name, field, handleChange}: FieldProps & WithArrayFieldProps) {
    const values: FieldValue[] = field.value;
    return (
        <div>
            {values.map((value, index) => {
                return (
                    <div key={index}>
                        <input
                            placeholder={`${name}-${index}`}
                            value={values[index]}
                            onChange={e => handleChange(index, e.target.value)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

function Field({name, field, handleChange}: FieldProps & WithFieldProps) {
    return <input placeholder={name} name={name} value={field.value} onChange={e => handleChange(e)} />;
}

const ConnectedArrayField = withArrayField(ArrayField);
const ConnectedField = withField(Field);

test('validate form', () => {
    const onValidationResult = jest.fn();
    function ValidationResult() {
        const serviceFactory = useServiceFactory<ServiceFactory>();
        const validator = serviceFactory.createFormValidator();
        return (
            <div>
                <button
                    type="button"
                    onClick={() => {
                        const validationResult = validator.validate();
                        onValidationResult(validationResult);
                    }}
                >
                    Validate
                </button>
            </div>
        );
    }
    const {getByText} = render(
        <Form
            fieldConfiguration={{
                favNumbers: {
                    validationRules: /^[0-9]+$/,
                },
                favNames: {
                    validationRules: () => /^[a-z]+$/,
                },
                favLanguages: {
                    validationRules: /^[a-z]+$/,
                },
                name: {
                    validationRules: /^[a-z]+$/,
                    skipValidation: true,
                },
                email: {
                    validationRules: /^[a-z]+@wb\.com$/,
                },
                secondaryEmail: {
                    validationRules: /^[a-z]+@wb\.com$/,
                },
                phone: {
                    validationRules: /^[0-9]{10}$/,
                },
                username: {
                    validationRules: /^[a-z][a-z0-9]+$/,
                },
            }}
        >
            <ConnectedArrayField name="favNumbers" initialValue={['1', 'abc', '3']} />
            <ConnectedArrayField name="favNames" initialValue={['abc', '2', 'xyz']} />
            <ConnectedArrayField name="favLanguages" initialValue={['ar', 'en']} />
            <ConnectedField name="name" initialValue="22ali" />
            <ConnectedField name="age" initialValue="22" />
            <ConnectedField name="email" initialValue="ali@wb.com" />
            <ConnectedField name="secondaryEmail" initialValue="ali@test.com" />
            <ConnectedField name="phone" initialValue="1234567890" />
            <ConnectedField name="username" initialValue="123user" />

            <ValidationResult />
        </Form>,
    );

    fireEvent.click(getByText('Validate'));

    expect(onValidationResult).toHaveBeenCalledWith({
        valid: false,
        failedFields: ['favNumbers', 'favNames', 'secondaryEmail', 'username'],
    });
});
