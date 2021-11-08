import {RootReducer} from "./RootReducer";
import {FormAction, FormActionType} from "../Actions/Form/FormAction";
import {UpdatePropertyPayload} from "../Actions/Form/Payload";
import {FieldsState, RootState} from "../Types/RootState";

export const formReducer: RootReducer<FormAction<any>> = (state, action) => {
    switch (action.type) {
        case FormActionType.CLEAR:
            return clearFormValues(state);
        case FormActionType.UPDATE_PROPERTY:
            return updateFormProperty(state, action);
    }
    return state;
}

function clearFormValues(state: RootState): RootState {
    const keys = Object.keys(state.fields);
    const updatedFields = keys.reduce(((newFields: FieldsState, key) => {
        newFields[key] = {...state.fields[key], value: state.fields[key].clearValue};
        return newFields;
    }), {});
    return {...state, fields: updatedFields}
}


function updateFormProperty(state: RootState, action: FormAction<UpdatePropertyPayload>) {
    return {...state, form: {...state.form, [action.payload.propertyName]: action.payload.value}};
}