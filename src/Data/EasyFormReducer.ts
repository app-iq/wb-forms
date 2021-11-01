import {EasyFormAction} from "../Actions/EasyFormAction";
import {SetupActionType} from "../Actions/SetupAction";
import {StateActionType} from "../Actions/StateAction";

export interface EasyFormReducerState {
    fields: {
        [fieldName: string]: {
            configuration: any;
            state: any;
            ref: any;
        }
    }
}

export const easyFormReducerInitialState: EasyFormReducerState = {
    fields: {}
};


export type EasyFormReducer = (state: EasyFormReducerState, action: EasyFormAction<any, any>) => EasyFormReducerState;


export const easyFormReducer: EasyFormReducer = (state, action) => {
    const fields = {...state.fields};
    switch (action.type) {
        case SetupActionType.INITIALIZE_FIELD:
            fields[action.payload] = {configuration: {name: action.payload}, state: {value: ''}, ref: null};
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