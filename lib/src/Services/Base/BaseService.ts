import {DispatchFunction} from 'wb-core-provider';
import {FormProps} from '../../Form/FormProps';
import {State} from '../../Data/State';
import {ServiceFactory} from '../ServiceFactory/ServiceFactory';

export abstract class BaseService {
    protected constructor(
        protected readonly state: State,
        protected readonly dispatch: DispatchFunction,
        protected readonly formProps: FormProps,
        protected readonly serviceFactory: ServiceFactory,
    ) {}
}
