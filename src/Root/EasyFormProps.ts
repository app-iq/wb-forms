import {ReactElement} from "react";
import {ServiceFactory} from "../Services/Services";
import {DispatchFunction} from "./DispatchContext";
import {EasyFormReducerState} from "../Data/Reducer/EasyFormReducer";

export interface EasyFormProps {
    children: ReactElement[] | ReactElement;
    serviceFactoryCallback?: (dispatch: DispatchFunction, state: EasyFormReducerState, props: EasyFormProps) => ServiceFactory;
    getDispatch?: (dispatch: DispatchFunction) => void;
    getState?: (state: EasyFormReducerState) => void;
}