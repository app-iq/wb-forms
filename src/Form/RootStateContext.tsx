import React from "react";
import {rootReducerInitialState} from "../Data/Reducer/RootReducer";
import {RootState} from "../Data/Types/RootState";

export const RootStateContext = React.createContext<RootState>(rootReducerInitialState);

