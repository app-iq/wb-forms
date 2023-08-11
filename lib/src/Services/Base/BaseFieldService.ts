import {DispatchFunction} from 'wb-core-provider';
import {BaseService} from './BaseService';
import {FieldState, State} from '../../Data/State';
import {FormProps} from '../../Form/FormProps';
import {ServiceFactory} from '../ServiceFactory/ServiceFactory';
import {FieldConfiguration} from '../../Field/FieldProps';

export abstract class BaseFieldService extends BaseService {
    protected constructor(
        protected readonly fieldName: string,
        state: State,
        dispatch: DispatchFunction,
        formProps: FormProps,
        serviceFactory: ServiceFactory,
    ) {
        super(state, dispatch, formProps, serviceFactory);
    }

    protected getFieldState(): FieldState {
        return this.state.fields[this.fieldName];
    }

    protected getFieldConfiguration(): FieldConfiguration {
        return this.serviceFactory.getFieldConfiguration(this.fieldName) ?? {};
    }
}
