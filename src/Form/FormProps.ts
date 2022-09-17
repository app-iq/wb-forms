import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';
import {DispatchFunction} from './DispatchContext';
import {RootReducer} from '../Data/RootReducer';
import {Action} from '../Data/Action';
import {State} from '../Data/State';
import {FieldConfiguration} from '../Field/FieldProps';
import {PropsWithChildren} from 'react';

export interface FormProps {
    serviceFactoryCallback?: (dispatch: DispatchFunction, state: State, props: PropsWithChildren<FormProps>) => ServiceFactory;
    getDispatch?: (dispatch: DispatchFunction) => void;
    getState?: (state: State) => void;
    reducers?: RootReducer<Action<unknown, unknown>>[];
    serviceOptions?: {
        [serviceName: string]: unknown;
    };
    fieldConfiguration?: Record<string, FieldConfiguration>;
}


