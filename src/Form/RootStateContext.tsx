import React, {useContext} from "react";
import {rootReducerInitialState, RootState} from "../Data/Reducer/RootReducer";

export const RootStateContext = React.createContext<RootState>(rootReducerInitialState);

export function useRootState(): RootState {
    return useContext(RootStateContext);
}

export function withRootState(Component: any) {
    return function Wrapper(props: any) {
        const formState = useRootState();
        return <Component {...props} formState={formState}/>
    }
}