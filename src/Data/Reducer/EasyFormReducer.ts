import {EasyFormAction} from "../Actions/EasyFormAction";
import {FieldState} from "../Types/FieldState";
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


export function buildRootReducer(reducers : EasyFormReducer<EasyFormAction<any, any>>[] = []) : EasyFormReducer<EasyFormAction<any, any>>{
    return (state, action) => {
        const allReducers: EasyFormReducer<any>[] = [setupReducer, fieldReducer].concat(reducers);
        return allReducers.reduce(((state, reduce) => reduce(state, action)), state);
    };
}

