import {DispatchFunction} from "../../../Root/DispatchContext";

export abstract class ServiceBase {

    protected readonly dispatch: DispatchFunction;

    protected constructor(dispatch: DispatchFunction) {
        this.dispatch = dispatch;
    }

}