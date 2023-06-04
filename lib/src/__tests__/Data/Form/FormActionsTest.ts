import { FormActions } from '../../../Data/Form/FormActions';
import { FormAction, FormActionType, SetCustomValuePayload } from '../../../Data/Form/FormAction';
import { FieldConfiguration } from '../../../Field/FieldProps';

describe('FromActions', () => {
    it('should create clear action', function () {
        const fieldsConfiguration = { username: { clearValue: '-' } };
        const action = FormActions.clearValues(fieldsConfiguration);
        const expected: FormAction<Record<string, FieldConfiguration>> = {
            type: FormActionType.CLEAR,
            payload: fieldsConfiguration,
        };
        expect(action).toEqual(expected);
    });

    it('should create set custom value action', function () {
        const action = FormActions.setCustomValue('error', { message: 'test error' });
        const expected: FormAction<SetCustomValuePayload> = {
            type: FormActionType.SET_CUSTOM_VALUE,
            payload: {
                name: 'error',
                value: { message: 'test error' },
            },
        };
        expect(action).toEqual(expected);
    });
});
