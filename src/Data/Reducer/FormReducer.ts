import {RootReducer, RootState, Fields} from "./RootReducer";
import {FormAction, FormActionType} from "../Actions/Form/FormAction";

export const formReducer: RootReducer<FormAction<any>> = (state, action) => {
    switch (action.type) {
        case FormActionType.CLEAR:
            return clearFormValues(state, action);
    }
    return state;
}

function clearFormValues(state: RootState, action: FormAction<undefined>): RootState {
    const keys = Object.keys(state.fields);
    const updatedFields = keys.reduce(((newFields: Fields, key) => {
        newFields[key] = {...state.fields[key], value: ''};
        return newFields;
    }), {});
    return {...state, fields: updatedFields}
}