import { ServiceFactory } from '../Services/ServiceFactory/ServiceFactory';
import { State } from '../Data/State';
import { FieldConfiguration } from '../Field/FieldProps';
import { PropsWithChildren } from 'react';
import { Action, DispatchFunction, Reducer } from 'wb-core-provider';

export interface FormProps {
    serviceProvider?: (dispatch: DispatchFunction, state: State, props: PropsWithChildren<FormProps>) => ServiceFactory;
    reducers?: Reducer<State, Action<unknown, unknown>>[];
    serviceOptions?: Record<string, unknown>;
    fieldConfiguration?: Record<string, FieldConfiguration>;
}
