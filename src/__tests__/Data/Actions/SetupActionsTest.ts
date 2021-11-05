import {SetupActions} from "../../../Data/Actions/Setup/SetupActions";
import {FieldState} from "../../../Data/Types/FieldState";
import {SetupActionType} from "../../../Data/Actions/Setup/SetupAction";
import {buildMockField} from "../../TestHelpers";

describe('Setup Actions', () => {
    it('should return initialize action', function () {
        const field: FieldState = buildMockField({
            name: 'test',
            value: 'xyz',
            valueSelector: e => e,
            valid: true, validateOnChange: true, skipValidation: false, validationRules: undefined
        });
        const action = SetupActions.initializeField('test', field);
        expect(action).toEqual({
            type: SetupActionType.INITIALIZE_FIELD,
            payload: {
                name: 'test',
                field: field
            }
        });
    });
})