import {RootState} from "../../../Data/Types/RootState";
import {buildMockFieldState, buildMockFormState} from "../../TestHelpers";
import {FieldActions} from "../../../Data/Actions/Field/FieldActions";
import {fieldReducer} from "../../../Data/Reducer/FieldReducer";

describe('FieldReducerTest', () => {

    const initialState: RootState = {
        fields: {
            test: buildMockFieldState({name: 'test', value: 'test-value', valid: false})
        },
        form: buildMockFormState()
    };

    it('should handle change value action', function () {
        const action = FieldActions.changeValue('test', 'ali');
        const newState = fieldReducer(initialState, action);
        const expectedState: RootState = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], value: 'ali'}}
        };
        expect(newState).toEqual(expectedState);
    });

    it('should handle change validation state action', function () {
        const action = FieldActions.changeValidationState('test', true);
        const newState = fieldReducer(initialState, action);
        const expectedState: RootState = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], valid: true}}
        };
        expect(newState).toEqual(expectedState);
    });


    it('should handle change property action', function () {
        const action = FieldActions.changeProperty('test', 'readonly', false);
        const newState = fieldReducer(initialState, action);
        const expectedState: RootState = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], readonly: false}}
        };
        expect(newState).toEqual(expectedState);
    });


    it('should handle change property action for non typed property', function () {
        const action = FieldActions.changeProperty('test', 'nonTypedProperty', 'test-value');
        const newState = fieldReducer(initialState, action);
        const expectedState: RootState = {
            ...initialState,
            fields: {...initialState.fields, test: {...initialState.fields['test'], nonTypedProperty: 'test-value'}}
        };
        expect(newState).toEqual(expectedState);
    });



    it('should return state when submitting action for non defined field', function () {
        const action = FieldActions.changeProperty('nonDefinedField', 'value', 'test-value');
        const newState = fieldReducer(initialState, action);
        expect(newState).toEqual(initialState);
    });

})