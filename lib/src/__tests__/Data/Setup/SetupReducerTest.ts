import {SetupActions} from '../../../Data/Setup/SetupActions';
import {setupReducer} from '../../../Data/Setup/SetupReducer';
import {buildMockFieldState} from '../../Utils/TestHelpers';
import {FieldState, INITIAL_STATE, State} from '../../../Data/State';

describe('SetupReducer', () => {

    it('should initialize field', function () {
        let state: State = INITIAL_STATE;
        const fieldName = 'test';
        const field: FieldState = buildMockFieldState({name: fieldName});
        const action = SetupActions.initializeField(fieldName, field);
        state = setupReducer(state, action);
        const newField = state.fields[fieldName];
        expect(newField).toBeTruthy();
        expect(newField).toEqual(field);
    });
});
