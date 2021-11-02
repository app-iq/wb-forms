import {EasyFormReducer, EasyFormReducerState} from "./EasyFormReducer";
import {FieldAction, FieldActionType} from "../Actions/Field/FieldAction";
import {FieldState} from "../Types/FieldState";
import {SimpleFieldPayload} from "../Actions/Payload";

export const fieldReducer: EasyFormReducer<FieldAction<any>> = (state, action) => {

    switch (action.type) {
        case FieldActionType.CHANGE_VALUE:
            return updateFieldIfExists(state, action, handleValueChange(action));
    }

    return state;
}

type HandleFieldChangeCallback = (field: FieldState) => FieldState;

function updateFieldIfExists(state: EasyFormReducerState, action: FieldAction<any>, handleChange: HandleFieldChangeCallback): EasyFormReducerState {
    const fields = {...state.fields};
    let toChangeField = fields[action.payload.name];
    if (toChangeField === undefined) {
        return state;
    }
    fields[action.payload.name] = handleChange(toChangeField);
    return {...state, fields: fields};
}

const handleValueChange = (action: FieldAction<SimpleFieldPayload<any>>) => (field: FieldState) => ({
    ...field,
    value: action.payload.value
});