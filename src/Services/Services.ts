import {FieldValidator} from "./Protocol/FieldValidator";
import {ChangeHandler} from "./Protocol/ChangeHandler";
import {DispatchFunction} from "../Root/DispatchContext";
import {EasyFormReducerState} from "../Data/Reducer/EasyFormReducer";
import {DefaultChangeHandler} from "./DefaultImplementation/DefaultChangeHandler";
import {RegexBasedFieldValidator} from "./DefaultImplementation/RegexBasedFieldValidator";
import {EasyFormProps} from "../Root/EasyFormProps";

export type ServiceCallback<TService> = (dispatch: DispatchFunction, state: EasyFormReducerState, serviceFactory: ServiceFactory) => TService

export interface FieldServices {
    fieldValidator: ServiceCallback<FieldValidator>;
    changeHandler: ServiceCallback<ChangeHandler>;
}

export interface ServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator;

    createChangeHandler(fieldName: string): ChangeHandler;
}

export class DefaultServiceFactory implements ServiceFactory {

    private readonly state: EasyFormReducerState;
    private readonly dispatch: DispatchFunction;
    private readonly formProps: EasyFormProps;

    constructor(state: EasyFormReducerState, dispatch: DispatchFunction, formProps: EasyFormProps) {
        this.state = state;
        this.dispatch = dispatch;
        this.formProps = formProps;
    }

    createChangeHandler(fieldName: string): ChangeHandler {
        const field = this.state.fields[fieldName];
        if (field?.services.changeHandler) {
            return field.services.changeHandler(this.dispatch, this.state, this);
        }

        return new DefaultChangeHandler(this.dispatch, this.state.fields[fieldName], this.createFieldValidator(fieldName));
    }

    createFieldValidator(fieldName: string): FieldValidator {
        const field = this.state.fields[fieldName];
        if (field?.services.fieldValidator) {
            return field.services.fieldValidator(this.dispatch, this.state, this);
        }

        return new RegexBasedFieldValidator();
    }

}