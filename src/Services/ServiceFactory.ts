import {FieldValidator} from "./Protocol/FieldValidator";
import {ChangeHandler} from "./Protocol/ChangeHandler";
import {DispatchFunction} from "../Form/DispatchContext";
import {RootState} from "../Data/Reducer/RootReducer";
import {DefaultChangeHandler} from "./DefaultImplementation/DefaultChangeHandler";
import {RegexBasedFieldValidator} from "./DefaultImplementation/RegexBasedFieldValidator";
import {EasyFormProps} from "../Form/EasyFormProps";
import {SubmitService} from "./Protocol/SubmitService";
import {DefaultHttpSubmitService} from "./DefaultImplementation/DefaultHttpSubmitService";

export type ServiceCallback<TService> = (dispatch: DispatchFunction, state: RootState, serviceFactory: ServiceFactory) => TService

export interface FieldServices {
    fieldValidator: ServiceCallback<FieldValidator>;
    changeHandler: ServiceCallback<ChangeHandler>;
}

export interface ServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator;

    createChangeHandler(fieldName: string): ChangeHandler;

    createSubmitService(): SubmitService;
}

export class DefaultServiceFactory implements ServiceFactory {

    private readonly rootState: RootState;
    private readonly dispatch: DispatchFunction;
    private readonly formProps: EasyFormProps;

    constructor(state: RootState, dispatch: DispatchFunction, formProps: EasyFormProps) {
        this.rootState = state;
        this.dispatch = dispatch;
        this.formProps = formProps;
    }

    createChangeHandler(fieldName: string): ChangeHandler {
        const field = this.rootState.fields[fieldName];
        if (field?.services.changeHandler) {
            return field.services.changeHandler(this.dispatch, this.rootState, this);
        }

        return new DefaultChangeHandler(this.dispatch, this.rootState.fields[fieldName], this.createFieldValidator(fieldName));
    }

    createFieldValidator(fieldName: string): FieldValidator {
        const field = this.rootState.fields[fieldName];
        if (field?.services.fieldValidator) {
            return field.services.fieldValidator(this.dispatch, this.rootState, this);
        }

        return new RegexBasedFieldValidator();
    }

    createSubmitService(): SubmitService {
        return new DefaultHttpSubmitService(this.dispatch,this.rootState, this.formProps.serviceOptions);
    }

}