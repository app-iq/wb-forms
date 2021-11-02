import {EasyFormAction} from "../Actions/EasyFormAction";
import {FieldState} from "../../Field/FieldState";
import {setupReducer} from "./SetupReducer";
import {fieldReducer} from "./FieldReducer";


export type Fields = { [fieldName: string]: FieldState }

export interface EasyFormReducerState {
    fields: Fields;
}

export const easyFormReducerInitialState: EasyFormReducerState = {
    fields: {}
};


export type EasyFormReducer<TAction extends EasyFormAction<any, any>> = (state: EasyFormReducerState, action: TAction) => EasyFormReducerState;


export const easyFormReducer: EasyFormReducer<EasyFormAction<any, any>> = (state, action) => {
    const reducers: EasyFormReducer<any>[] = [setupReducer, fieldReducer];
    return reducers.reduce(((state, reduce) => reduce(state, action)), state);
};