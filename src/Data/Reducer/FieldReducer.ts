import {RootReducer} from "./RootReducer";
import {FieldAction, FieldActionType} from "../Actions/Field/FieldAction";
import {FieldState} from "../Types/FieldState";
import {ChangePropertyPayload, FieldPayload, SimpleFieldPayload} from "../Actions/Field/Payload";
import {RootState} from "../Types/RootState";

export const fieldReducer: RootReducer<FieldAction<any>> = (state, action) => {

    switch (action.type) {
        case FieldActionType.CHANGE_VALUE:
            return updateFieldIfExists(state, action, handleValueChange(action));

        case FieldActionType.SET_VALIDATION_STATE:
            return updateFieldIfExists(state, action, handleValidation(action));

        case FieldActionType.CHANGE_PROPERTY:
            return updateFieldIfExists(state, action, handleChangeProperty(action));
    }

    return state;
}

type HandleFieldChangeCallback = (field: FieldState) => FieldState;
type HandleFieldAction<TPayload extends FieldPayload> = (action: FieldAction<TPayload>) => HandleFieldChangeCallback;
type HandleSimpleFieldAction<TValue> = (action: FieldAction<SimpleFieldPayload<TValue>>) => HandleFieldChangeCallback;


function updateFieldIfExists(state: RootState, action: FieldAction<any>, handleChange: HandleFieldChangeCallback): RootState {
    const fields = {...state.fields};
    let toChangeField = fields[action.payload.name];
    if (toChangeField === undefined) {
        return state;
    }
    fields[action.payload.name] = handleChange(toChangeField);
    return {...state, fields: fields};
}

const changeProperty = (field: FieldState, propertyName: keyof FieldState, value: any) => ({
    ...field,
    [propertyName]: value
});


const handleValueChange: HandleSimpleFieldAction<any> = action => field => changeProperty(field, "value", action.payload.value);

const handleChangeProperty: HandleFieldAction<ChangePropertyPayload> = action => field => changeProperty(field, action.payload.propertyName, action.payload.value);

const handleValidation: HandleSimpleFieldAction<boolean> = action => field => changeProperty(field, 'valid', action.payload.value);