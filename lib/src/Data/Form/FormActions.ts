import { FormAction, FormActionType, SetCustomValuePayload } from './FormAction';
import { FieldConfiguration } from '../../Field/FieldProps';

export class FormActions {
    public static clearValues(
        fieldsConfiguration: Record<string, FieldConfiguration> = {}
    ): FormAction<Record<string, FieldConfiguration>> {
        return {
            type: FormActionType.CLEAR,
            payload: fieldsConfiguration,
        };
    }

    public static setCustomValue(stateName: string, value: unknown): FormAction<SetCustomValuePayload> {
        return {
            type: FormActionType.SET_CUSTOM_VALUE,
            payload: {
                value: value,
                name: stateName,
            },
        };
    }
}
