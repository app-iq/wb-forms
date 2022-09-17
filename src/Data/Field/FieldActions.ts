import {FieldAction, FieldActionType, SetCustomValuePayload, SimpleFieldPayload} from './FieldAction';
import {FieldValue} from '../State';

export class FieldActions {

    public static changeValue(fieldName: string, value: FieldValue): FieldAction<SimpleFieldPayload<FieldValue>> {
        return {
            type: FieldActionType.CHANGE_VALUE,
            payload: {
                name: fieldName,
                value: value,
            },
        };
    }

    public static changeValidationState(name: string, valid: boolean): FieldAction<SimpleFieldPayload<boolean>> {
        return {
            type: FieldActionType.SET_VALIDATION_STATE,
            payload: {
                name: name,
                value: valid,
            },
        };
    }

    public static setCustomValue(fieldName: string, stateName: string, value: unknown): FieldAction<SetCustomValuePayload> {
        return {
            type: FieldActionType.SET_CUSTOM_VALUE,
            payload: {
                name: fieldName,
                value: value,
                propertyName: stateName
            },
        };
    }

}
