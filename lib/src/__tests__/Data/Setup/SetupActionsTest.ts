import {SetupActions} from '../../../Data/Setup/SetupActions';
import {InitializePayload, SetupAction, SetupActionType} from '../../../Data/Setup/SetupAction';
import {buildMockFieldState} from '../../../Utils/TestHelpers';
import {FieldState} from '../../../Data/State';

describe('Setup Actions', () => {
    it('should return initialize action', function () {
        const field: FieldState = buildMockFieldState({
            name: 'test',
            value: 'xyz',
            valueSelector: (e: unknown) => e,
            valid: true, validateOnChange: true, skipValidation: false, validationRules: undefined
        });
        const action = SetupActions.initializeField('test', field);
        const expected: SetupAction<InitializePayload> = {
            type: SetupActionType.INITIALIZE_FIELD,
            payload: {
                name: 'test',
                field: field
            }
        };
        expect(action).toEqual(expected);
    });
});
