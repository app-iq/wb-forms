import {EasyFormAction} from "../Actions/EasyFormAction";
import {FieldState} from "../Types/FieldState";
import {setupReducer} from "./SetupReducer";
import {fieldReducer} from "./FieldReducer";
import {submitReducer} from "./SubmitReducer";


export type Fields = { [fieldName: string]: FieldState }

export interface FormState {
    loading: boolean;
    error?: any;
    response?: any;
}

export interface RootState {
    fields: Fields;
    form: FormState;
}

export const rootReducerInitialState: RootState = {
    fields: {},
    form: {
        loading: false
    }
};


export type RootReducer<TAction extends EasyFormAction<any, any>> = (state: RootState, action: TAction) => RootState;


const baseReducers: RootReducer<EasyFormAction<any, any>>[] = [
    setupReducer,
    fieldReducer,
    submitReducer
];

export function buildRootReducer(reducers: RootReducer<EasyFormAction<any, any>>[] = []): RootReducer<EasyFormAction<any, any>> {
    return (state, action) => {
        const allReducers: RootReducer<any>[] = baseReducers.concat(reducers);
        return allReducers.reduce(((state, reduce) => reduce(state, action)), state);
    };
}

