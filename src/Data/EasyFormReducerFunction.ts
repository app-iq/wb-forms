import {EasyFormAction} from "../Actions/EasyFormAction";
import {InitializePayload, SetupAction, SetupActionType} from "../Actions/SetupAction";
import {StateActionType} from "../Actions/StateAction";
import {Field} from "../Field/Field";


export type Fields = { [fieldName: string]: Field }

export interface EasyFormReducerState {
    fields: Fields;
}

export const easyFormReducerInitialState: EasyFormReducerState = {
    fields: {}
};


export type EasyFormReducerFunction = (state: EasyFormReducerState, action: EasyFormAction<any, any>) => EasyFormReducerState;


export const easyFormReducer: EasyFormReducerFunction = (state, action) => {
    const fields = {...state.fields};
    switch (action.type) {
        case SetupActionType.INITIALIZE_FIELD:
            return initializeField(state, action);
        case StateActionType.CHANGE_VALUE:
            let toChangeField = fields[action.payload.fieldName];
            if (toChangeField === undefined) {
                return state;
            }
            fields[action.payload.fieldName] = {
                ...toChangeField,
                value: action.payload.value
            };
            return {...state, fields: fields};
    }
    return state;
};


function initializeField(state: EasyFormReducerState, action: SetupAction<InitializePayload>): EasyFormReducerState {
    const fields = {...state.fields};
    fields[action.payload.name] = {...action.payload.field};
    return {...state, fields: fields};
}