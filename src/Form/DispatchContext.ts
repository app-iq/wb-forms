import React, {useContext} from "react";
import {Action} from "../Data/Actions/Action";

export type DispatchFunction = (action: Action<any, any>) => void;

const defaultDispatch: DispatchFunction = () => {
    throw new Error("cannot find reducer");
}

export const DispatchContext = React.createContext<DispatchFunction>(defaultDispatch);


export function useDispatch(){
    return useContext(DispatchContext);
}