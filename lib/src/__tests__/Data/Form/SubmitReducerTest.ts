import {SubmitActions} from '../../../Data/Form/SubmitActions';
import {State} from '../../../Data/State';
import {buildMockFormState} from '../../Utils/TestHelpers';
import {submitReducer} from '../../../Data/Form/SubmitReducer';

const initialState: State = {
    fields: {},
    form: buildMockFormState(),
};

describe('SubmitReducerTest', () => {
    it('should handle submit start action', () => {
        const action = SubmitActions.submitStart();
        const currentState = {...initialState, form: {loading: true, error: true, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: State = {
            ...initialState,
            form: {...initialState.form, loading: true, error: undefined, response: undefined},
        };
        expect(newState).toEqual(expected);
    });

    it('should handle submit fail action', () => {
        const action = SubmitActions.submitFail({message: 'test-error'});
        const currentState = {...initialState, form: {loading: true, error: undefined, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: State = {
            ...initialState,
            form: {...initialState.form, loading: true, error: {message: 'test-error'}, response: undefined},
        };
        expect(newState).toEqual(expected);
    });

    it('should handle submit succeed action', () => {
        const action = SubmitActions.submitSucceed({success: true});
        const currentState = {...initialState, form: {loading: true, error: true, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: State = {
            ...initialState,
            form: {...initialState.form, loading: true, error: undefined, response: {success: true}},
        };
        expect(newState).toEqual(expected);
    });

    it('should handle submit complete action', () => {
        const action = SubmitActions.submitComplete();
        const currentState = {...initialState, form: {loading: true, error: true, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: State = {
            ...initialState,
            form: {...initialState.form, loading: false, error: true, response: true},
        };
        expect(newState).toEqual(expected);
    });
});
