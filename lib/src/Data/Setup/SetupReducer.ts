import {Reducer} from 'wb-core-provider';
import {InitializePayload, SetupAction, SetupActionType} from './SetupAction';
import {State} from '../State';

function initializeField(state: State, action: SetupAction<InitializePayload>): State {
    const fields = {...state.fields};
    if (fields[action.payload.name]) {
        return state;
    }
    fields[action.payload.name] = {...action.payload.field};
    return {...state, fields};
}

export const setupReducer: Reducer<State, SetupAction<unknown>> = (state, action) => {
    switch (action.type) {
        case SetupActionType.INITIALIZE_FIELD:
            return initializeField(state, action as SetupAction<InitializePayload>);
        default:
            return state;
    }
};
