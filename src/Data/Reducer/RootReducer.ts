import {Action} from "../Actions/Action";
import {setupReducer} from "./SetupReducer";
import {fieldReducer} from "./FieldReducer";
import {submitReducer} from "./SubmitReducer";
import {RootState} from "../Types/RootState";


export const rootReducerInitialState: RootState = {
    fields: {},
    form: {
        loading: false
    }
};


export type RootReducer<TAction extends Action<any, any>> = (state: RootState, action: TAction) => RootState;


const baseReducers: RootReducer<Action<any, any>>[] = [
    setupReducer,
    fieldReducer,
    submitReducer
];

export function buildRootReducer(reducers: RootReducer<Action<any, any>>[] = []): RootReducer<Action<any, any>> {
    return (state, action) => {
        const allReducers: RootReducer<any>[] = baseReducers.concat(reducers);
        return allReducers.reduce(((state, reduce) => reduce(state, action)), state);
    };
}

