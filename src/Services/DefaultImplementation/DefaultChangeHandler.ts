import {ChangeHandler} from "../Protocol/ChangeHandler";
import {DispatchFunction} from "../../Form/DispatchContext";
import {FieldState} from "../../Data/Types/FieldState";
import {FieldActions} from "../../Data/Actions/Field/FieldActions";
import {FieldValidator} from "../Protocol/FieldValidator";

export class DefaultChangeHandler implements ChangeHandler {

    private readonly fieldValidator: FieldValidator;
    private readonly fieldState : FieldState;
    private readonly dispatch : DispatchFunction;

    constructor(dispatch: DispatchFunction, fieldState: FieldState, fieldValidator: FieldValidator) {
        this.fieldValidator = fieldValidator;
        this.fieldState = fieldState;
        this.dispatch = dispatch;
    }

    handle(e: any, listener?: (newValue:any) => void): void {
        if (this.fieldState.readonly) {
            return;
        }

        let newValue = this.fieldState.valueSelector(e, this.fieldState);
        this.dispatch(FieldActions.changeValue(this.fieldState.name, newValue));
        listener?.(newValue);
        if (this.shouldValidate()) {
            let validateAction = FieldActions.validate(this.fieldState.name, this.fieldValidator.validate(newValue, this.fieldState.validationRules));
            this.dispatch(validateAction);
        }
    }

    private shouldValidate(): boolean {
        return this.fieldState.validateOnChange && !this.fieldState.skipValidation && this.fieldState.validationRules;
    }

}