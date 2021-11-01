import {EasyFormAction} from "../Actions/EasyFormAction";
import {SetupActionType} from "../Actions/SetupAction";

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
            return {...state , fields : fields};
    }
    return state;
};