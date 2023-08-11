import {useDispatch, useState} from 'wb-core-provider';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {WithFieldProps} from '../../../Field/BaseFieldComponent';
import {withField} from '../../../Field/WithField';
import {State} from '../../../Data/State';
import {FieldActions} from '../../../Data/Field/FieldActions';
import {FieldProps} from '../../../Field/FieldProps';
import {Form} from '../../../Form/Form';

type Props = WithFieldProps & FieldProps;

function Field({name}: Props) {
    const state = useState<State>();
    const dispatch = useDispatch();
    const {value, valid, ready} = state.fields[name];
    const {abc} = state.fields[name];
    return (
        <div>
            {(abc as string) && <span>{abc as string}</span>}
            <input
                placeholder={name}
                value={value}
                className={valid ? 'valid' : 'invalid'}
                disabled={!ready}
                onChange={e => {
                    dispatch(FieldActions.changeValue(name, e.target.value));
                    if (e.target.value === 'invalid') {
                        dispatch(FieldActions.changeValidationState(name, false));
                    } else {
                        dispatch(FieldActions.changeValidationState(name, true));
                    }
                    if (e.target.value === 'custom') {
                        dispatch(FieldActions.setCustomValue(name, 'abc', 'my custom value'));
                    } else {
                        dispatch(FieldActions.setCustomValue(name, 'abc', undefined));
                    }
                }}
            />
            <button type="button" onClick={() => dispatch(FieldActions.setReady(name, true))}>
                SET READY
            </button>
            <button type="button" onClick={() => dispatch(FieldActions.setReady(name, false))}>
                SET NOT READY
            </button>
        </div>
    );
}
const ConnectedField = withField(Field);

test('change value', async () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );
    const input = screen.getByPlaceholderText('test');
    await act(() => fireEvent.change(input, {target: {value: 'new value'}}));
    expect(input).toHaveValue('new value');
});

test('change valid', async () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );
    const input = screen.getByPlaceholderText('test');
    await act(() => fireEvent.change(input, {target: {value: 'invalid'}}));
    expect(input).toHaveClass('invalid');
    await act(() => fireEvent.change(input, {target: {value: 'any other value'}}));
    expect(input).toHaveClass('valid');
});

test('set ready', async () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('test')).toBeEnabled();
    await act(() => fireEvent.click(screen.getByText('SET NOT READY')));
    expect(screen.getByPlaceholderText('test')).toBeDisabled();
    await act(() => fireEvent.click(screen.getByText('SET READY')));
    expect(screen.getByPlaceholderText('test')).toBeEnabled();
});

test('set custom value', async () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );
    const input = screen.getByPlaceholderText('test');
    await act(() => fireEvent.change(input, {target: {value: 'custom'}}));
    expect(screen.getByText('my custom value')).toBeInTheDocument();
    await act(() => fireEvent.change(input, {target: {value: 'any other value'}}));
    expect(screen.queryByText('my custom value')).not.toBeInTheDocument();
});
