import {RootState} from "../../../Data/Types/RootState";
import {buildMockFieldState, buildMockFormState} from "../../TestHelpers";
import {FormActions} from "../../../Data/Actions/Form/FormActions";
import {formReducer} from "../../../Data/Reducer/FormReducer";

describe('FormReducer', () => {

    const initialState: RootState = {
        fields: {
            username: buildMockFieldState({name: 'test', value: 'test-value', valid: false, clearValue: ''}),
            password: buildMockFieldState({name: 'test', value: 'test-value', valid: false, clearValue: 'cleared'})
        },
        form: buildMockFormState()
    };

    it('should handle clear action', function () {
        const action = FormActions.clearValues();
        const newState = formReducer(initialState, action);
        const expectedState: RootState = {
            ...initialState, fields: {
                username: {...initialState.fields['username'], value: ''},
                password: {...initialState.fields['password'], value: 'cleared'}
            }
        };
        expect(newState).toEqual(expectedState);
    });


    it('should handle update form property action', function () {
        const action = FormActions.updateProperty('loading', true);
        const newState = formReducer(initialState, action);
        const expectedState: RootState = {
            ...initialState, form: {...initialState.form, loading: true}
        };
        expect(newState).toEqual(expectedState);
    });


    it('return same state form unknown action', function () {
        const newState = formReducer(initialState, {type: 'UNKNOWN' as any, payload: undefined});
        expect(newState).toEqual(initialState);
    });

});