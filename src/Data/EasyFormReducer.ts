import {EasyFormAction} from "../Actions/EasyFormAction";

export interface EasyFormReducerState {
    configuration: any;    //TODO: SET TYPE
    state: any;             //TODO: SET TYPE
}

export const easyFormReducerInitialState: EasyFormReducerState = {
    state: {},
    configuration: {}
};


export type EasyFormReducer = (state: EasyFormReducerState, action: EasyFormAction<any, any>) => EasyFormReducerState;


export const easyFormReducer: EasyFormReducer = (state, action) => {
    return state;
};