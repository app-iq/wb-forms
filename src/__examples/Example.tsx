import DefaultTextField from "./Components/DefaultTextField";
import React, {useState} from "react";
import {EasyForm} from "../Root/EasyForm";
import {EasyFormReducer, Fields} from "../Data/Reducer/EasyFormReducer";
import {EasyFormAction} from "../Data/Actions/EasyFormAction";
import {DispatchFunction} from "../Root/DispatchContext";

export function SimpleExample() {
    const [dispatch, setDispatch] = useState<DispatchFunction | undefined>(undefined);
    return <EasyForm reducers={[clearReducer]}
                     getDispatch={dispatch => setDispatch(() => dispatch)}
                     getState={state => console.log('state changed', state)}>
        <div>
            <span>Username</span>
            <DefaultTextField name={'username'} initialValue={'ali faris'}/>
        </div>
        <div>
            <span>Password</span>
            <DefaultTextField name={'password'} validationRules={'^[0-9]{4,6}$'}/>
        </div>

        <button onClick={() => dispatch?.({type: 'CLEAR', payload: undefined})}>
            CLEAR
        </button>
    </EasyForm>;
}


const clearReducer: EasyFormReducer<EasyFormAction<any, any>> = (state, action) => {
    if (action.type === 'CLEAR') {
        const keys = Object.keys(state.fields);
        const updatedFields = keys.reduce(((newFields: Fields, key) => {
            newFields[key] = {...state.fields[key] , value : ''};
            return newFields;
        }), {});
        console.log(updatedFields);
        return {...state, fields: updatedFields};
    }
    return state;
}