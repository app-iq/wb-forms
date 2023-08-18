import {Reducer} from 'wb-core-provider';
import {FormAction, FormActionType, SetCustomValuePayload} from './FormAction';
import {FieldsState, State} from '../State';
import {FieldConfiguration} from '../../Field/FieldProps';

function clearFormValues(state: State, fieldsConfiguration: Record<string, FieldConfiguration>): State {
    const keys = Object.keys(state.fields);
    const updatedFields = keys.reduce((newFields: FieldsState, key) => {
        const defaultClearValue = Array.isArray(state.fields[key].value) ? [] : '';
        const newValue = fieldsConfiguration[key]?.clearValue ?? defaultClearValue;
        const newValid = Array.isArray(newValue) ? Array(newValue.length).fill(true) : true;
        return {
            ...newFields,
            [key]: {
                ...state.fields[key],
                value: newValue,
                valid: newValid,
            },
        };
    }, {});
    return {...state, fields: updatedFields};
}

function handleCustomValueAction(state: State, action: FormAction<SetCustomValuePayload>) {
    return {...state, form: {...state.form, [action.payload.name]: action.payload.value}};
}

export const formReducer: Reducer<State, FormAction<unknown>> = (state, action) => {
    switch (action.type) {
        case FormActionType.CLEAR:
            return clearFormValues(state, action.payload as Record<string, FieldConfiguration>);
        case FormActionType.SET_CUSTOM_VALUE:
            return handleCustomValueAction(state, action as FormAction<SetCustomValuePayload>);
        default:
            return state;
    }
};
