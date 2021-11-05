import React from "react";
import {EasyFormAction} from "../Data/Actions/EasyFormAction";

export type DispatchFunction = (action: EasyFormAction<any, any>) => void;

const defaultDispatch: DispatchFunction = () => {
    throw new Error("cannot find reducer");
}

export const DispatchContext = React.createContext<DispatchFunction>(defaultDispatch);
