import {ServiceBase} from "./ServiceBase";
import {FieldState} from "../../../Data/Types/FieldState";
import {DispatchFunction} from "../../../Root/DispatchContext";

export abstract class FieldServiceBase extends ServiceBase {

    protected readonly fieldState: FieldState;

    protected constructor(dispatch: DispatchFunction, fieldState: FieldState) {
        super(dispatch);
        this.fieldState = fieldState;
    }

}