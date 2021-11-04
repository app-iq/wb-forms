import {ReactElement} from "react";
import {ServiceFactory} from "../Services/Services";
import {DispatchFunction} from "./DispatchContext";
import {EasyFormReducer, EasyFormReducerState} from "../Data/Reducer/EasyFormReducer";
import {EasyFormAction} from "../Data/Actions/EasyFormAction";

export interface EasyFormProps {
    children: ReactElement[] | ReactElement;
    serviceFactoryCallback?: (dispatch: DispatchFunction, state: EasyFormReducerState, props: EasyFormProps) => ServiceFactory;
    getDispatch?: (dispatch: DispatchFunction) => void;
    getState?: (state: EasyFormReducerState) => void;
    reducers?: EasyFormReducer<EasyFormAction<any, any>>[];
}