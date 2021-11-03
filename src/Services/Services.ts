import {FieldsRenderService} from "./Protocol/FieldsRenderService";
import {FieldValidator} from "./Protocol/FieldValidator";
import {ChangeHandler, ChangeHandlerCallbackOptions} from "./Protocol/ChangeHandler";
import {DispatchFunction} from "../Root/DispatchContext";

export type ServiceCallback<TService , TOptions = any> = (dispatch: DispatchFunction, options?: TOptions) => TService

export interface FieldServices {
    fieldValidator: ServiceCallback<FieldValidator>;
    changeHandler: ServiceCallback<ChangeHandler , ChangeHandlerCallbackOptions>;
}

export interface Services extends FieldServices {
    fieldsRenderService: ServiceCallback<FieldsRenderService>;
}

