import {ServiceFactory} from "../Services/ServiceFactory/ServiceFactory";
import {DispatchFunction} from "./DispatchContext";
import {RootReducer} from "../Data/Reducer/RootReducer";
import {Action} from "../Data/Actions/Action";
import {RootState} from "../Data/Types/RootState";

export interface FormProps {
    serviceFactoryCallback?: (dispatch: DispatchFunction, state: RootState, props: FormProps) => ServiceFactory;
    getDispatch?: (dispatch: DispatchFunction) => void;
    getState?: (state: RootState) => void;
    reducers?: RootReducer<Action<any, any>>[];
    serviceOptions?: {
        [serviceName: string]: any;
    }
}


