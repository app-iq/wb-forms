import {Action} from './Action';
import {setupReducer} from './Setup/SetupReducer';
import {fieldReducer} from './Field/FieldReducer';
import {submitReducer} from './Form/SubmitReducer';
import {State} from './State';
import {formReducer} from './Form/FormReducer';

export const initialState: State = {
    fields: {},
    form: {
        loading: false
    }
};

export type RootReducer<TAction extends Action<unknown, unknown>> = (state: State, action: TAction) => State;

const baseReducers = [
    setupReducer,
    fieldReducer,
    submitReducer,
    formReducer
];

export function buildRootReducer(reducers: RootReducer<Action<unknown, unknown>>[] = []): RootReducer<Action<unknown, unknown>> {
    return (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allReducers: RootReducer<any>[] = baseReducers.concat(reducers);
        return allReducers.reduce(((state, reduce) => {
            const newState = reduce(state, action);
            if (newState === undefined) {
                return state;
            }
            return newState;
        }), state);
    };
}

