import {FieldValidator} from "../Services/Protocol/FieldValidator";
import {ChangeHandler} from "../Services/Protocol/ChangeHandler";
import {DispatchFunction} from "../Form/DispatchContext";
import {RootState} from "../Data/Types/RootState";
import {ServiceFactory} from "../Services/ServiceFactory/ServiceFactory";

export type ServiceCallback<TService> = (dispatch: DispatchFunction, state: RootState, serviceFactory: ServiceFactory) => TService

export interface FieldServices {
    fieldValidator: ServiceCallback<FieldValidator>;
    changeHandler: ServiceCallback<ChangeHandler>;
}