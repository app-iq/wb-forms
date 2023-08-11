import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {useDispatch, useState} from 'wb-core-provider';
import {useContext} from 'react';
import {FieldProps} from '../../../Field/FieldProps';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {Form} from '../../../Form/Form';
import {withArrayField, WithArrayFieldProps} from '../../../Field/WithArrayField';
import {FormActions} from '../../../Data/Form/FormActions';
import {FieldConfigurationContext} from '../../../Field/FieldConfigurationContext';
import {State} from '../../../Data/State';

function CustomValue() {
    const state = useState<State>();
    const dispatch = useDispatch();
    const {abc} = state.form;
    return (
        <div>
            {abc ? <span>{abc as string}</span> : null}
            <button type="button" onClick={() => dispatch(FormActions.setCustomValue('abc', 'my custom value'))}>
                SET CUSTOM VALUE
            </button>
            <button type="button" onClick={() => dispatch(FormActions.setCustomValue('abc', undefined))}>
                CLEAR CUSTOM VALUE
            </button>
        </div>
    );
}

function ClearButton() {
    const dispatch = useDispatch();
    const fieldConfiguration = useContext(FieldConfigurationContext);
    return (
        <button type="button" onClick={() => dispatch(FormActions.clearValues(fieldConfiguration))}>
            Clear
        </button>
    );
}
function Field({name, field, handleChange}: FieldProps & WithFieldProps) {
    return <input placeholder={name} value={field.value} onChange={e => handleChange(e.target.value)} />;
}

function ArrayField({name, field, handleChange}: FieldProps & WithArrayFieldProps) {
    return (
        <div>
            {field.value.map((value: string, index: number) => (
                <input
                    key={index}
                    placeholder={`${name}-${index}`}
                    value={value}
                    onChange={e => handleChange(index, e.target.value)}
                />
            ))}
        </div>
    );
}
const ConnectedField = withField(Field);
const ConnectedArrayField = withArrayField(ArrayField);

test('clear value', async () => {
    render(
        <Form
            fieldConfiguration={{
                email: {
                    clearValue: '@wb.com',
                },
                phones: {
                    clearValue: ['123'],
                },
            }}
        >
            <ConnectedField name="name" initialValue="ali" />
            <ConnectedField name="email" initialValue="ali@wb.com" />
            <ConnectedArrayField name="phones" initialValue={['123', '789']} />
            <ConnectedArrayField name="list" initialValue={['item 1', 'item 2', 'item 3']} />
            <ClearButton />
        </Form>,
    );
    expect(screen.getByPlaceholderText('name')).toHaveValue('ali');
    expect(screen.getByPlaceholderText('email')).toHaveValue('ali@wb.com');
    expect(screen.getByPlaceholderText('phones-0')).toHaveValue('123');
    expect(screen.getByPlaceholderText('phones-1')).toHaveValue('789');
    expect(screen.getByPlaceholderText('list-0')).toHaveValue('item 1');
    expect(screen.getByPlaceholderText('list-1')).toHaveValue('item 2');
    expect(screen.getByPlaceholderText('list-2')).toHaveValue('item 3');
    await act(() => fireEvent.click(screen.getByText('Clear')));
    expect(screen.getByPlaceholderText('name')).toHaveValue('');
    expect(screen.getByPlaceholderText('email')).toHaveValue('@wb.com');
    expect(screen.getByPlaceholderText('phones-0')).toHaveValue('123');
    expect(screen.queryByPlaceholderText('list-0')).not.toBeInTheDocument();
});

test('set custom value', async () => {
    render(
        <Form>
            <ConnectedField name="name" initialValue="ali" />
            <CustomValue />
        </Form>,
    );

    expect(screen.queryByText('my custom value')).not.toBeInTheDocument();
    await act(() => fireEvent.click(screen.getByText('SET CUSTOM VALUE')));
    expect(screen.getByText('my custom value')).toBeInTheDocument();
    await act(() => fireEvent.click(screen.getByText('CLEAR CUSTOM VALUE')));
    expect(screen.queryByText('my custom value')).not.toBeInTheDocument();
});
