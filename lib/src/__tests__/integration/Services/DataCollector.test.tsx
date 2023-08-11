import {act, fireEvent, render} from '@testing-library/react';
import React from 'react';
import {useServiceFactory} from 'wb-core-provider';
import {Form} from '../../../Form/Form';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {FieldValue} from '../../../Data/State';
import {ServiceFactory} from '../../../Services/ServiceFactory/ServiceFactory';

function Field({name, field, handleChange}: FieldProps & WithFieldProps) {
    return <input placeholder={name} name={name} value={field.value} onChange={e => handleChange(e)} />;
}

const ConnectedField = withField(Field);

test('collect data', () => {
    const mockSubmit = jest.fn();
    function Button() {
        const serviceFactory = useServiceFactory<ServiceFactory>();
        const collector = serviceFactory.createDataCollectorService();
        return (
            <button type="button" onClick={() => mockSubmit(collector.collect())}>
                submit
            </button>
        );
    }
    const stringToBoolean = (str: string) => Boolean(Number(str));
    const {getByText} = render(
        <Form
            serviceOptions={{
                collector: {
                    phone: (value: FieldValue) => `+964${value}`,
                    gender: (value: FieldValue) => stringToBoolean(value),
                    isActive: (value: FieldValue) => stringToBoolean(value),
                },
            }}
        >
            <ConnectedField name="name" initialValue="ali" />
            <ConnectedField name="family" initialValue="AL-Jabiry" />
            <ConnectedField name="email" initialValue="ali@wb.com" />
            <ConnectedField name="phone" initialValue="1234567890" />
            <ConnectedField name="gender" initialValue="1" />
            <ConnectedField name="isActive" initialValue="0" />

            <Button />
        </Form>,
    );
    act(() => fireEvent.click(getByText('submit')));
    expect(mockSubmit).toHaveBeenCalledWith({
        name: 'ali',
        family: 'AL-Jabiry',
        email: 'ali@wb.com',
        phone: '+9641234567890',
        gender: true,
        isActive: false,
    });
});
