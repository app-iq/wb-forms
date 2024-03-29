import {DispatchFunction} from 'wb-core-provider';
import {SubmitService} from '../Protocol/SubmitService';
import {SubmitActions} from '../../Data/Form/SubmitActions';
import {FormActions} from '../../Data/Form/FormActions';
import {State} from '../../Data/State';
import {FieldConfiguration} from '../../Field/FieldProps';
import {DataCollector} from '../Protocol/DataCollector';

export abstract class SubmitServiceBase<TOptions extends SubmitterOptionsBase> implements SubmitService {
    protected readonly options: TOptions;

    public constructor(
        protected readonly dispatch: DispatchFunction,
        protected readonly rootState: State,
        options: Record<string, unknown>,
        protected readonly collectorService: DataCollector,
        protected readonly fieldsConfiguration: Record<string, FieldConfiguration> = {},
    ) {
        this.options = this.extractSubmitOptions(options);
    }

    submit(): Promise<void> {
        this.dispatch(SubmitActions.submitStart());
        return new Promise((resolve, reject) => {
            const data = this.collectorService.collect();
            this.getSubmitPromise(data)
                .then(response => {
                    this.onSuccess(response);
                    this.onComplete();
                    resolve();
                })
                .catch(e => {
                    this.onFail(e);
                    this.onComplete();
                    reject();
                });
        });
    }

    protected abstract extractSubmitOptions(options: Record<string, unknown>): TOptions;

    protected abstract getSubmitPromise(data: Record<string, unknown>): Promise<unknown>;

    protected onSuccess(response: unknown): void {
        this.dispatch(SubmitActions.submitSucceed(response));
        this.options.onSuccess?.(response, this.dispatch);
        const clearAfterSuccess = this.options.clearAfterSuccess ?? true;
        if (clearAfterSuccess) {
            this.dispatch(FormActions.clearValues(this.fieldsConfiguration));
        }
    }

    protected onFail(error: unknown): void {
        this.dispatch(SubmitActions.submitFail(error));
        this.options.onFail?.(error, this.dispatch);
    }

    protected onComplete(): void {
        this.dispatch(SubmitActions.submitComplete());
        this.options.onComplete?.(this.dispatch);
    }
}

export interface SubmitterOptionsBase {
    onSuccess?: (response: unknown, dispatch: DispatchFunction) => void;
    onFail?: (error: unknown, dispatch: DispatchFunction) => void;
    onComplete?: (dispatch: DispatchFunction) => void;
    clearAfterSuccess?: boolean;
}
