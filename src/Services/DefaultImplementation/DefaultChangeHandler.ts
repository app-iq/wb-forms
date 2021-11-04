import {FieldServiceBase} from "../Protocol/Base/FieldServiceBase";
import {ChangeHandler} from "../Protocol/ChangeHandler";
import {DispatchFunction} from "../../Root/DispatchContext";
import {FieldState} from "../../Data/Types/FieldState";
import {FieldActions} from "../../Data/Actions/Field/FieldActions";
import {FieldValidator} from "../Protocol/FieldValidator";

export class DefaultChangeHandler extends FieldServiceBase implements ChangeHandler {

    private readonly fieldValidator: FieldValidator;

    constructor(dispatch: DispatchFunction, fieldState: FieldState, fieldValidator: FieldValidator) {
        super(dispatch, fieldState);
        this.fieldValidator = fieldValidator;
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