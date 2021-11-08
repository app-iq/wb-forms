import {RootState} from "../Data/Types/RootState";
import {useContext} from "react";
import {RootStateContext} from "./RootStateContext";
import {DispatchContext} from "./DispatchContext";

export function useRootState(): RootState {
    return useContext(RootStateContext);
}

export function useDispatch() {
    return useContext(DispatchContext);
}