import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {It, Mock, Times} from 'typemoq';
import {FieldProps} from '../../../Field/FieldProps';
import {withArrayField, WithArrayFieldProps} from '../../../Field/WithArrayField';
import {Form} from '../../../Form/Form';
import {ArrayFieldChangeHandler} from '../../../Services/Protocol/ArrayFieldChangeHandler';

interface Props extends FieldProps, WithArrayFieldProps {
    customProps?: string;
}
function Field({handleChange, name, field, customProps, add, remove}: Props) {
    const values: string[] = field.value;
    const valid: boolean[] = field.valid as boolean[];
    return (
        <div>
            <span>Array Field</span>
            {customProps && <span>{customProps}</span>}
            {values.map((value: string, index: number) => (
                <React.Fragment key={index}>
                    <span>
                        {name}-{index}
                    </span>
                    <span>
                        is valid ({index}): {valid[index] ? 'true' : 'false'}
                    </span>
                    <input
                        placeholder={`${name}-${index}-field`}
                        name={`${name}-${index}`}
                        onChange={e => handleChange(index, e.target.value)}
                        value={value}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove {index}
                    </button>
                </React.Fragment>
            ))}
            <button type="button" onClick={add}>
                Add
            </button>
        </div>
    );
}

const ConnectedField = withArrayField(Field);

test('render field', () => {
    render(
        <Form>
            <ConnectedField name="test" />
        </Form>,
    );
    expect(screen.getByText('Array Field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test-0-field')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('test-1-field')).not.toBeInTheDocument();
});

test('hide field when set from configuration', () => {
    render(
        <Form
            fieldConfiguration={{
                test: {
                    hidden: true,
                },
            }}
        >
            <ConnectedField name="test" />
        </Form>,
    );
    expect(screen.queryByText('Array Field')).not.toBeInTheDocument();
});

test('change handler', () => {
    const arrayFieldChangeHandler = Mock.ofType<ArrayFieldChangeHandler>();
    arrayFieldChangeHandler.setup(x => x.handleChange(It.isAnyNumber(), It.isAnyString())).verifiable();

    render(
        <Form
            customServiceFactory={{
                arrayFieldChangeHandler: () => arrayFieldChangeHandler.object,
            }}
        >
            <ConnectedField name="test" />
        </Form>,
    );

    const input = screen.getByPlaceholderText('test-0-field') as HTMLInputElement;
    fireEvent.change(input, {target: {value: 'test'}});
    arrayFieldChangeHandler.verify(x => x.handleChange(It.isValue(0), It.isValue('test')), Times.once());
});

test('add field', () => {
    const arrayFieldChangeHandler = Mock.ofType<ArrayFieldChangeHandler>();
    arrayFieldChangeHandler.setup(x => x.add(It.isAny())).verifiable();

    render(
        <Form
            customServiceFactory={{
                arrayFieldChangeHandler: () => arrayFieldChangeHandler.object,
            }}
        >
            <ConnectedField name="test" />
        </Form>,
    );

    const button = screen.getByText('Add');
    fireEvent.click(button);
    arrayFieldChangeHandler.verify(x => x.add(It.isAny()), Times.once());
});

test('remove field', () => {
    const arrayFieldChangeHandler = Mock.ofType<ArrayFieldChangeHandler>();
    arrayFieldChangeHandler.setup(x => x.remove(It.isAnyNumber())).verifiable();

    render(
        <Form
            customServiceFactory={{
                arrayFieldChangeHandler: () => arrayFieldChangeHandler.object,
            }}
        >
            <ConnectedField name="test" />
        </Form>,
    );

    const button = screen.getByText('Remove 0');
    fireEvent.click(button);
    arrayFieldChangeHandler.verify(x => x.remove(It.isValue(0)), Times.once());
});

test('using default value', () => {
    const arrayFieldChangeHandler = Mock.ofType<ArrayFieldChangeHandler>();
    arrayFieldChangeHandler.setup(x => x.add(It.isAny())).verifiable();

    const NewConnectedField = withArrayField(Field, 'default value');
    render(
        <Form
            customServiceFactory={{
                arrayFieldChangeHandler: () => arrayFieldChangeHandler.object,
            }}
        >
            <NewConnectedField name="test" />
        </Form>,
    );
    expect(screen.getByPlaceholderText('test-0-field')).toHaveValue('default value');
    const button = screen.getByText('Add');
    fireEvent.click(button);
    arrayFieldChangeHandler.verify(x => x.add(It.isValue('default value')), Times.once());
});

test('initial value and initial valid', () => {
    render(
        <Form>
            <ConnectedField name="test" initialValid={[true, false]} initialValue={['test 1', 'test 2']} />
        </Form>,
    );
    expect(screen.getByPlaceholderText('test-0-field')).toHaveValue('test 1');
    expect(screen.getByPlaceholderText('test-1-field')).toHaveValue('test 2');
    expect(screen.getByText('is valid (0): true')).toBeInTheDocument();
    expect(screen.getByText('is valid (1): false')).toBeInTheDocument();
});
