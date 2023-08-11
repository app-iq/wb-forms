import {act, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {useDispatch, useState} from 'wb-core-provider';
import {Form} from '../../../Form/Form';
import {State} from '../../../Data/State';
import {SubmitActions} from '../../../Data/Form/SubmitActions';

test('submit actions (happy path)', async () => {
    function InnerComponent() {
        const state = useState<State>();
        const dispatch = useDispatch();
        const submit = async () => {
            dispatch(SubmitActions.submitStart());
            const promise = new Promise<void>(resolve => {
                setTimeout(() => {
                    dispatch(SubmitActions.submitSucceed('my response'));
                    dispatch(SubmitActions.submitComplete());
                    resolve();
                }, 1000);
            });
            await promise;
        };

        return (
            <div>
                <h1>Loading: {state.form.loading ? 'true' : 'false'}</h1>
                <button type="button" onClick={() => submit()}>
                    SUBMIT
                </button>
            </div>
        );
    }
    render(
        <Form>
            <InnerComponent />
        </Form>,
    );
    expect(screen.getByText('Loading: false')).toBeInTheDocument();
    await act(() => screen.getByText('SUBMIT').click());
    await waitFor(() => expect(screen.getByText('Loading: true')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Loading: false')).toBeInTheDocument());
});

test('submit actions (error path)', async () => {
    function InnerComponent() {
        const state = useState<State>();
        const dispatch = useDispatch();

        const submit = async () => {
            dispatch(SubmitActions.submitStart());
            const promise = new Promise<void>(resolve => {
                setTimeout(() => {
                    dispatch(SubmitActions.submitFail('my error'));
                    dispatch(SubmitActions.submitComplete());
                    resolve();
                }, 1000);
            });
            await promise;
        };

        return (
            <div>
                <h1>Loading: {state.form.loading ? 'true' : 'false'}</h1>
                {(state.form.error as string) && <h1>Error: {state.form.error as string}</h1>}
                <button type="button" onClick={() => submit()}>
                    SUBMIT
                </button>
            </div>
        );
    }
    render(
        <Form>
            <InnerComponent />
        </Form>,
    );
    expect(screen.getByText('Loading: false')).toBeInTheDocument();
    expect(screen.queryByText('Error: my error')).not.toBeInTheDocument();
    await act(() => screen.getByText('SUBMIT').click());
    await waitFor(() => {
        expect(screen.getByText('Loading: true')).toBeInTheDocument();
        expect(screen.queryByText('Error: my error')).not.toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText('Loading: false')).toBeInTheDocument();
        expect(screen.getByText('Error: my error')).toBeInTheDocument();
    });
});
