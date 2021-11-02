import {EasyFormReducer, EasyFormReducerState} from "./EasyFormReducer";
import {SetupAction, SetupActionType} from "../Actions/Setup/SetupAction";
import {InitializePayload} from "../Actions/Setup/Payload";

export const setupReducer: EasyFormReducer<SetupAction<any>> = (state, action) => {
    switch (action.type) {
        case SetupActionType.INITIALIZE_FIELD:
            return initializeField(state, action);
    }

    return state;
};


function initializeField(state: EasyFormReducerState, action: SetupAction<InitializePayload>): EasyFormReducerState {
    const fields = {...state.fields};
    fields[action.payload.name] = {...action.payload.field};
    return {...state, fields: fields};
}