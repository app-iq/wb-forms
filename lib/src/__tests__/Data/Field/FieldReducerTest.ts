import {State} from '../../../Data/State';
import {buildMockFieldState, buildMockFormState} from '../../Utils/TestHelpers';
import {FieldActions} from '../../../Data/Field/FieldActions';
import {fieldReducer} from '../../../Data/Field/FieldReducer';

describe('FieldReducerTest', () => {

    const initialState: State = {
        fields: {
            test: buildMockFieldState({value: 'test-value', valid: false})
        },
        form: buildMockFormState()
    };

    it('should handle change value action', function () {
        const action = FieldActions.changeValue('test', 'ali');
        const newState = fieldReducer(initialState, action);
        const expectedState: State = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], value: 'ali'}}
        };
        expect(newState).toEqual(expectedState);
    });

    it('should handle change validation state action', function () {
        const action = FieldActions.changeValidationState('test', true);
        const newState = fieldReducer(initialState, action);
        const expectedState: State = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], valid: true}}
        };
        expect(newState).toEqual(expectedState);
    });


    it('should handle set custom value action', function () {
        const action = FieldActions.setCustomValue('test', 'readonly', false);
        const newState = fieldReducer(initialState, action);
        const expectedState: State = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], readonly: false}}
        };
        expect(newState).toEqual(expectedState);
    });


    it('should handle change property action for non typed property', function () {
        const action = FieldActions.setCustomValue('test', 'nonTypedProperty', 'test-value');
        const newState = fieldReducer(initialState, action);
        const expectedState: State = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], nonTypedProperty: 'test-value'}}
        };
        expect(newState).toEqual(expectedState);
    });


    it('should return state when submitting action for non defined field', function () {
        const action = FieldActions.setCustomValue('nonDefinedField', 'value', 'test-value');
        const newState = fieldReducer(initialState, action);
        expect(newState).toEqual(initialState);
    });

});
