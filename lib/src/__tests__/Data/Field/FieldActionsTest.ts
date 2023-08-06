import {FieldActions} from '../../../Data/Field/FieldActions';
import {FieldAction, FieldActionType, SetCustomValuePayload, SimpleFieldPayload} from '../../../Data/Field/FieldAction';

describe('FieldActions', () => {
    it('should create change value action', () => {
        const action = FieldActions.changeValue('test', 'test-value');
        const expected: FieldAction<SimpleFieldPayload<unknown>> = {
            type: FieldActionType.CHANGE_VALUE,
            payload: {
                name: 'test',
                value: 'test-value',
            },
        };
        expect(action).toEqual(expected);
    });

    it('should create set custom value action', () => {
        const action = FieldActions.setCustomValue('test', 'readonly', false);
        const expected: FieldAction<SetCustomValuePayload> = {
            type: FieldActionType.SET_CUSTOM_VALUE,
            payload: {
                name: 'test',
                propertyName: 'readonly',
                value: false,
            },
        };
        expect(action).toEqual(expected);
    });

    it('should create validate action', () => {
        const action = FieldActions.changeValidationState('test', true);
        const expected: FieldAction<SimpleFieldPayload<boolean>> = {
            type: FieldActionType.SET_VALIDATION_STATE,
            payload: {
                name: 'test',
                value: true,
            },
        };
        expect(action).toEqual(expected);
    });
});
