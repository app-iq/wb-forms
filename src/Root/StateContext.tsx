import React, {useContext} from "react";
import {easyFormReducerInitialState, EasyFormReducerState} from "../Data/Reducer/EasyFormReducer";

export const StateContext = React.createContext<EasyFormReducerState>(easyFormReducerInitialState);

export function useFormState(): EasyFormReducerState {
    return useContext(StateContext);
}

export function withFormState(Component: any) {
    return function Wrapper(props: any) {
        const formState = useFormState();
        return <Component {...props} formState={formState}/>
    }
}