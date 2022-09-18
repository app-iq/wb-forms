import {FieldAction, FieldActionType, FieldPayload, SetCustomValuePayload, SimpleFieldPayload} from './FieldAction';
import {FieldState, State} from '../State';
import {Reducer} from 'wb-core-provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fieldReducer: Reducer<State, FieldAction<any>> = (state, action) => {

    switch (action.type) {
        case FieldActionType.CHANGE_VALUE:
            return updateFieldIfExists(state, action as FieldAction<SimpleFieldPayload<unknown>>, handleValueChange(action));

        case FieldActionType.SET_VALIDATION_STATE:
            return updateFieldIfExists(state, action, handleValidation(action));

        case FieldActionType.SET_CUSTOM_VALUE:
            return updateFieldIfExists(state, action, handleSetCustomValue(action));
    }
};

type HandleFieldChangeCallback = (field: FieldState) => FieldState;
type HandleSimpleFieldAction<TAction extends FieldPayload> = (action: FieldAction<TAction>) => HandleFieldChangeCallback;


function updateFieldIfExists(state: State, action: FieldAction<SimpleFieldPayload<unknown>>, handleChange: HandleFieldChangeCallback): State {
    const fields = {...state.fields};
    const toChangeField = fields[action.payload.name];
    if (toChangeField === undefined) {
        return state;
    }
    fields[action.payload.name] = handleChange(toChangeField);
    return {...state, fields: fields};
}

const changeProperty = (field: FieldState, propertyName: keyof FieldState, value: unknown) => ({
    ...field,
    [propertyName]: value
});

const handleValueChange: HandleSimpleFieldAction<SimpleFieldPayload<unknown>> = action => field => changeProperty(field, 'value', action.payload.value);

const handleSetCustomValue: HandleSimpleFieldAction<SetCustomValuePayload> = (action: FieldAction<SetCustomValuePayload>) => field => changeProperty(field, action.payload.propertyName, action.payload.value);

const handleValidation: HandleSimpleFieldAction<SimpleFieldPayload<boolean>> = action => field => changeProperty(field, 'valid', action.payload.value);
