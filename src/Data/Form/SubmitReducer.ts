import {RootReducer} from '../RootReducer';
import {SubmitAction, SubmitActionType} from './SubmitAction';

export const submitReducer: RootReducer<SubmitAction<unknown>> = (state, action) => {
    switch (action.type) {
        case SubmitActionType.SUBMIT_START:
            return {...state, form: {...state.form, loading: true, error: undefined, response: undefined}};
        case SubmitActionType.SUBMIT_FAIL:
            return {...state, form: {...state.form, error: action.payload, response: undefined}};
        case SubmitActionType.SUBMIT_SUCCESS:
            return {...state, form: {...state.form, error: undefined, response: action.payload}};
        case SubmitActionType.SUBMIT_COMPLETE:
            return {...state, form: {...state.form, loading: false}};
    }
};
