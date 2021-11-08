import {FieldActions} from "../../../Data/Actions/Field/FieldActions";
import {FieldAction, FieldActionType} from "../../../Data/Actions/Field/FieldAction";
import {ChangePropertyPayload, SimpleFieldPayload} from "../../../Data/Actions/Field/Payload";

describe("FieldActions", () => {

    it('should create change value action', function () {
        const action = FieldActions.changeValue('test', 'test-value');
        let expected: FieldAction<SimpleFieldPayload<any>> = {
            type: FieldActionType.CHANGE_VALUE,
            payload: {
                name: 'test',
                value: 'test-value'
            }
        };
        expect(action).toEqual(expected);
    });


    it('should create change property action', function () {
        const action = FieldActions.changeProperty('test', 'readonly', false);
        let expected: FieldAction<ChangePropertyPayload> = {
            type: FieldActionType.CHANGE_PROPERTY,
            payload: {
                name: 'test',
                propertyName: 'readonly',
                value: false
            }
        };
        expect(action).toEqual(expected);
    });

    it('should create validate action', function () {
        const action = FieldActions.changeValidationState('test', true);
        const expected: FieldAction<SimpleFieldPayload<boolean>> = {
            type: FieldActionType.SET_VALIDATION_STATE,
            payload: {
                name: 'test',
                value: true
            }
        };
        expect(action).toEqual(expected);
    });
});