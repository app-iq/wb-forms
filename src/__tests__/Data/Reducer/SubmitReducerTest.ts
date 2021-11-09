import {SubmitActions} from "../../../Data/Actions/Form/SubmitActions";
import {RootState} from "../../../Data/Types/RootState";
import {buildMockFormState} from "../../../Utils/TestHelpers";
import {submitReducer} from "../../../Data/Reducer/SubmitReducer";

const initialState: RootState = {
    fields: {},
    form: buildMockFormState()
};

describe('SubmitReducerTest', () => {
    it('should handle submit start action', function () {
        const action = SubmitActions.submitStart();
        let currentState = {...initialState, form: {loading: true, error: true, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: RootState = {
            ...initialState,
            form: {...initialState.form, loading: true, error: undefined, response: undefined}
        };
        expect(newState).toEqual(expected);
    });


    it('should handle submit fail action', function () {
        const action = SubmitActions.submitFail({message: 'test-error'});
        let currentState = {...initialState, form: {loading: true, error: undefined, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: RootState = {
            ...initialState,
            form: {...initialState.form, loading: true, error: {message: 'test-error'}, response: undefined}
        };
        expect(newState).toEqual(expected);
    });


    it('should handle submit succeed action', function () {
        const action = SubmitActions.submitSucceed({success: true});
        let currentState = {...initialState, form: {loading: true, error: true, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: RootState = {
            ...initialState,
            form: {...initialState.form, loading: true, error: undefined, response: {success: true}}
        };
        expect(newState).toEqual(expected);
    });

    it('should handle submit complete action', function () {
        const action = SubmitActions.submitComplete();
        let currentState = {...initialState, form: {loading: true, error: true, response: true}};
        const newState = submitReducer(currentState, action);
        const expected: RootState = {
            ...initialState,
            form: {...initialState.form, loading: false, error: true, response: true}
        };
        expect(newState).toEqual(expected);
    });


    it('return same state form unknown action', function () {
        const newState = submitReducer(initialState , {type : 'UNKNOWN' as any , payload : undefined});
        expect(newState).toEqual(initialState);
    });


})