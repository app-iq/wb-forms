import {SubmitService} from "../Protocol/SubmitService";
import {DispatchFunction} from "../../Form/DispatchContext";
import {SubmitActions} from "../../Data/Actions/Form/SubmitActions";
import {FormActions} from "../../Data/Actions/Form/FormActions";
import {RootState} from "../../Data/Types/RootState";

export abstract class SubmitServiceBase<TOptions extends SubmitterOptionsBase> implements SubmitService {

    protected readonly dispatch: DispatchFunction;
    protected readonly rootState: RootState;
    protected readonly options: TOptions;

    public constructor(dispatch: DispatchFunction, rootState: RootState, options: any) {
        this.dispatch = dispatch;
        this.rootState = rootState;
        this.options = this.extractSubmitOptions(options);
    }

    submit(): Promise<void> {
        this.dispatch(SubmitActions.submitStart());
        return new Promise((resolve, reject) => {
            this.getSubmitPromise()
                .then((response) => {
                    this.onSuccess(response);
                    resolve();
                })
                .catch((e) => {
                    this.onFail(e);
                    reject();
                })
                .finally(() => this.onComplete());
        });
    }

    protected abstract extractSubmitOptions(options: any): TOptions;

    protected abstract getSubmitPromise(): Promise<any>;

    protected onSuccess(response: any): void {
        this.dispatch(SubmitActions.submitSucceed(response));
        this.options.onSuccess?.(response, this.dispatch);
        let clearAfterSuccess = this.options.clearAfterSuccess ?? true;
        if (clearAfterSuccess) {
            this.dispatch(FormActions.clearValues());
        }
    }

    protected onFail(error: any): void {
        this.dispatch(SubmitActions.submitFail(error));
        this.options.onFail?.(error, this.dispatch);
    }

    protected onComplete(): void {
        this.dispatch(SubmitActions.submitComplete());
        this.options.onComplete?.(this.dispatch);
    }

}


export interface SubmitterOptionsBase {
    onSuccess?: (response: any, dispatch: DispatchFunction) => void;
    onFail?: (error: any, dispatch: DispatchFunction) => void;
    onComplete?: (dispatch: DispatchFunction) => void;
    clearAfterSuccess?: boolean;
}
