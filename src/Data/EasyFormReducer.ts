import {EasyFormAction} from "../Actions/EasyFormAction";
import {SetupActionType} from "../Actions/SetupAction";
import {StateActionType} from "../Actions/StateAction";
import {FieldConfiguration} from "../Field/FieldConfiguration";
import {FieldState} from "../Field/FieldState";


export interface Field {
    configuration: FieldConfiguration;
    state: FieldState;
}

export type Fields = { [fieldName: string]: Field }

export interface EasyFormReducerState {
    fields: Fields;
}

export const easyFormReducerInitialState: EasyFormReducerState = {
    fields: {}
};


export type EasyFormReducer = (state: EasyFormReducerState, action: EasyFormAction<any, any>) => EasyFormReducerState;


export const easyFormReducer: EasyFormReducer = (state, action) => {
    const fields = {...state.fields};
    switch (action.type) {
        case SetupActionType.INITIALIZE_FIELD:
            fields[action.payload] = {
                configuration: {name: action.payload, valueSelector: null as any},
                state: {value: ''}
            };
            return {...state, fields: fields};
        case StateActionType.CHANGE_VALUE:
            let toChangeField = fields[action.payload.fieldName];
            if (toChangeField === undefined) {
                return state;
            }
            fields[action.payload.fieldName] = {
                ...toChangeField,
                state: {...toChangeField.state, value: action.payload.value}
            };
            return {...state, fields: fields};
    }
    return state;
};