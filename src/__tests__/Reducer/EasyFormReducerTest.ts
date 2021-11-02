import {easyFormReducer, easyFormReducerInitialState, EasyFormReducerState} from "../../Data/Reducer/EasyFormReducer";
import {SetupActions} from "../../Data/Actions/Setup/SetupActions";
import {FieldState} from "../../Field/FieldState";

describe('EasyFormReducer', () => {

    it('should initialize field', function () {
        let state: EasyFormReducerState = easyFormReducerInitialState;
        const fieldName = 'test';
        const field: FieldState = {
            name: fieldName,
            value: 'some value',
            valueSelector: e => e
        };
        const action = SetupActions.initializeField(fieldName, field);
        state = easyFormReducer(state, action);
        const newField = state.fields[fieldName];
        expect(newField).toBeTruthy();
        expect(newField).toEqual(field);
    });

});