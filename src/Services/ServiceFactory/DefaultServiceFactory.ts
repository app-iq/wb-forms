import {RootState} from "../../Data/Types/RootState";
import {DispatchFunction} from "../../Form/DispatchContext";
import {FormProps} from "../../Form/FormProps";
import {ChangeHandler} from "../Protocol/ChangeHandler";
import {DefaultChangeHandler} from "../DefaultImplementation/DefaultChangeHandler";
import {FieldValidator} from "../Protocol/FieldValidator";
import {RegexBasedFieldValidator} from "../DefaultImplementation/RegexBasedFieldValidator";
import {SubmitService} from "../Protocol/SubmitService";
import {DefaultHttpSubmitService} from "../DefaultImplementation/DefaultHttpSubmitService";
import {ServiceFactory} from "./ServiceFactory";
import {StateUpdater} from "../Protocol/StateUpdater";
import {DefaultStateUpdater} from "../DefaultImplementation/DefaultStateUpdater";

export class DefaultServiceFactory implements ServiceFactory {

    private readonly rootState: RootState;
    private readonly dispatch: DispatchFunction;
    private readonly formProps: FormProps;

    constructor(state: RootState, dispatch: DispatchFunction, formProps: FormProps) {
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
        return new DefaultHttpSubmitService(this.dispatch, this.rootState, this.formProps.serviceOptions);
    }

    createStateUpdater(): StateUpdater {
        return new DefaultStateUpdater(this.dispatch);
    }

}