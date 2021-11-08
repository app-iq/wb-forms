import {RootState} from "../Data/Types/RootState";
import {useContext} from "react";
import {RootStateContext} from "./RootStateContext";

export function useRootState(): RootState {
    return useContext(RootStateContext);
}