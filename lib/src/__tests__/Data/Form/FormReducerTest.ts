import {State} from '../../../Data/State';
import {buildMockFieldState, buildMockFormState} from '../../Utils/TestHelpers';
import {FormActions} from '../../../Data/Form/FormActions';
import {formReducer} from '../../../Data/Form/FormReducer';

describe('FormReducer', () => {

    const initialState: State = {
        fields: {
            username: buildMockFieldState({value: 'test-value', valid: false}),
            password: buildMockFieldState({value: 'test-value', valid: false})
        },
        form: buildMockFormState()
    };

    it('should handle clear action', function () {
        const action = FormActions.clearValues();
        const newState = formReducer(initialState, action);
        const expectedState: State = {
            ...initialState, fields: {
                username: {...initialState.fields['username'], value: ''},
                password: {...initialState.fields['password'], value: ''}
            }
        };
        expect(newState).toEqual(expectedState);
    });

    it('should handle clear action using fields configuration', function () {
        const action = FormActions.clearValues({
            username: {clearValue: 'username'},
            password: {clearValue: 'password'}
        });
        const newState = formReducer(initialState, action);
        const expectedState: State = {
            ...initialState, fields: {
                username: {...initialState.fields['username'], value: 'username'},
                password: {...initialState.fields['password'], value: 'password'}
            }
        };
        expect(newState).toEqual(expectedState);
    });


    it('should handle set custom value action', function () {
        const action = FormActions.setCustomValue('errors', ['error_1']);
        const newState = formReducer(initialState, action);
        const expectedState: State = {
            ...initialState, form: {...initialState.form, errors: ['error_1']}
        };
        expect(newState).toEqual(expectedState);
    });

});
