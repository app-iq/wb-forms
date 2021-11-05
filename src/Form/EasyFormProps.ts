import {ReactElement} from "react";
import {ServiceFactory} from "../Services/ServiceFactory";
import {DispatchFunction} from "./DispatchContext";
import {RootReducer, RootState} from "../Data/Reducer/RootReducer";
import {EasyFormAction} from "../Data/Actions/EasyFormAction";

export interface EasyFormProps {
    children: ReactElement[] | ReactElement;
    serviceFactoryCallback?: (dispatch: DispatchFunction, state: RootState, props: EasyFormProps) => ServiceFactory;
    getDispatch?: (dispatch: DispatchFunction) => void;
    getState?: (state: RootState) => void;
    reducers?: RootReducer<EasyFormAction<any, any>>[];
    serviceOptions?: {
        [serviceName : string] : any;
    }
}


