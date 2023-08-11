import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Action, Reducer, useDispatch, useServiceFactory} from 'wb-core-provider';
import {Mock, Times} from 'typemoq';
import {Form} from '../../../Form/Form';
import {DefaultServiceFactory} from '../../../Services/ServiceFactory/DefaultServiceFactory';
import {State} from '../../../Data/State';
import {useField} from '../../../Field/Hooks';
import {useSubmit} from '../../../Form/UseSubmit';
import {SubmitService} from '../../../Services/Protocol/SubmitService';
import {useValidateForm} from '../../../Form/UseValidateForm';
import {FormValidator, ValidationResult} from '../../../Services/Protocol/FormValidator';

test('render the children', () => {
    const {getByText} = render(
        <Form>
            <div>Test</div>
        </Form>,
    );
    expect(getByText('Test')).toBeInTheDocument();
});

test('default service factory', () => {
    function InnerComponent() {
        const serviceFactory = useServiceFactory();
        expect(serviceFactory).toBeInstanceOf(DefaultServiceFactory);
        return null;
    }

    render(
        <Form>
            <InnerComponent />
        </Form>,
    );
});

test('using custom service factory when provided from props', () => {
    const customServiceFactoryCallback = jest.fn();
    render(<Form serviceProvider={customServiceFactoryCallback} />);
    expect(customServiceFactoryCallback).toHaveBeenCalled();
});

test('using custom reducers when provided from props', async () => {
    const customReducer: Reducer<State, Action<unknown, unknown>> = (state, action) => {
        if (action.type === 'TEST_ACTION') {
            return {
                ...state,
                fields: {
                    ...state.fields,
                    test: {
                        value: 'test value from custom reducer',
                        valid: true,
                        ready: true,
                    },
                },
            };
        }
        return state;
    };

    function InnerTestComponent() {
        const dispatch = useDispatch();
        const field = useField('test');

        return (
            <div>
                <button type="button" onClick={() => dispatch({type: 'TEST_ACTION', payload: undefined})}>
                    Dispatch Custom Action
                </button>
                <h1>TestField: {field?.value ?? '-'}</h1>
            </div>
        );
    }

    render(
        <Form reducers={[customReducer]}>
            <InnerTestComponent />
        </Form>,
    );

    expect(screen.getByText('TestField: -')).toBeInTheDocument();
    const button = screen.getByText('Dispatch Custom Action');
    await act(() => fireEvent.click(button));
    expect(screen.getByText('TestField: test value from custom reducer')).toBeInTheDocument();
});

test('useValidateForm', () => {
    let validationResult: ValidationResult | undefined;
    function InnerComponent() {
        const validateForm = useValidateForm();
        return (
            <button
                type="button"
                onClick={() => {
                    validationResult = validateForm();
                }}
            >
                Validate
            </button>
        );
    }

    const formValidator = Mock.ofType<FormValidator>();
    formValidator.setup(x => x.validate()).returns(() => ({valid: true, failedFields: []}));

    render(
        <Form
            customServiceFactory={{
                formValidator: () => formValidator.object,
            }}
        >
            <InnerComponent />
        </Form>,
    );

    const button = screen.getByText('Validate');
    fireEvent.click(button);
    expect(validationResult).toEqual({valid: true, failedFields: []});
});

test('useSubmit', () => {
    function InnerComponent() {
        const submit = useSubmit();
        return (
            <button type="button" onClick={() => submit()}>
                Submit
            </button>
        );
    }

    const submitService = Mock.ofType<SubmitService>();
    submitService.setup(x => x.submit()).verifiable();
    const formValidator = Mock.ofType<FormValidator>();
    formValidator.setup(x => x.validate()).returns(() => ({valid: true, failedFields: []}));

    render(
        <Form
            customServiceFactory={{
                submitService: () => submitService.object,
                formValidator: () => formValidator.object,
            }}
        >
            <InnerComponent />
        </Form>,
    );

    const button = screen.getByText('Submit');
    fireEvent.click(button);
    submitService.verify(x => x.submit(), Times.once());
});

test('useSubmit with onValidationFailed when form is not valid', () => {
    const onValidationFailed = jest.fn();
    function InnerComponent() {
        const submit = useSubmit({
            onValidationFailed,
        });
        return (
            <button type="button" onClick={() => submit()}>
                Submit
            </button>
        );
    }

    const submitService = Mock.ofType<SubmitService>();
    submitService.setup(x => x.submit()).verifiable();
    const formValidator = Mock.ofType<FormValidator>();
    formValidator.setup(x => x.validate()).returns(() => ({valid: false, failedFields: ['test']}));

    render(
        <Form
            customServiceFactory={{
                submitService: () => submitService.object,
                formValidator: () => formValidator.object,
            }}
        >
            <InnerComponent />
        </Form>,
    );

    const button = screen.getByText('Submit');
    fireEvent.click(button);
    submitService.verify(x => x.submit(), Times.never());
    expect(onValidationFailed).toHaveBeenCalledWith({
        valid: false,
        failedFields: ['test'],
    });
});
