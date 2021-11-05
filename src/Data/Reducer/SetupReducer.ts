import {RootReducer, RootState} from "./RootReducer";
import {SetupAction, SetupActionType} from "../Actions/Setup/SetupAction";
import {InitializePayload} from "../Actions/Setup/Payload";

export const setupReducer: RootReducer<SetupAction<any>> = (state, action) => {
    switch (action.type) {
        case SetupActionType.INITIALIZE_FIELD:
            return initializeField(state, action);
    }

    return state;
};


function initializeField(state: RootState, action: SetupAction<InitializePayload>): RootState {
    const fields = {...state.fields};
    if (fields[action.payload.name]) {
        return state;
    }
    fields[action.payload.name] = {...action.payload.field};
    return {...state, fields: fields};
}