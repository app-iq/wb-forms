import {SetupActions} from "../../../Data/Actions/Setup/SetupActions";
import {FieldState} from "../../../Data/Types/FieldState";
import {SetupAction, SetupActionType} from "../../../Data/Actions/Setup/SetupAction";
import {buildMockFieldState} from "../../../Utils/TestHelpers";
import {InitializePayload} from "../../../Data/Actions/Setup/Payload";

describe('Setup Actions', () => {
    it('should return initialize action', function () {
        const field: FieldState = buildMockFieldState({
            name: 'test',
            value: 'xyz',
            valueSelector: e => e,
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
})