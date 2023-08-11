import {PropsWithChildren} from 'react';
import {Action, DispatchFunction, Reducer} from 'wb-core-provider';
import {ServiceFactory} from '../Services/ServiceFactory/ServiceFactory';
import {State} from '../Data/State';
import {FieldConfiguration} from '../Field/FieldProps';
import {FieldValidator} from '../Services/Protocol/FieldValidator';
import {FormValidator} from '../Services/Protocol/FormValidator';
import {ChangeHandler} from '../Services/Protocol/ChangeHandler';
import {ArrayFieldChangeHandler} from '../Services/Protocol/ArrayFieldChangeHandler';
import {SubmitService} from '../Services/Protocol/SubmitService';
import {FileUploader} from '../Services/Protocol/FileUploader';
import {DataCollector} from '../Services/Protocol/DataCollector';

type CustomServiceFactory<TService> = (
    state: State,
    dispatch: DispatchFunction,
    props: PropsWithChildren<FormProps>,
    self: ServiceFactory,
) => TService;

type CustomFieldServiceFactory<TService> = (
    fieldName: string,
    state: State,
    dispatch: DispatchFunction,
    props: PropsWithChildren<FormProps>,
    self: ServiceFactory,
) => TService;

export interface FormProps {
    serviceProvider?: (dispatch: DispatchFunction, state: State, props: PropsWithChildren<FormProps>) => ServiceFactory;
    reducers?: Reducer<State, Action<unknown, unknown>>[];
    serviceOptions?: Record<string, unknown>;
    fieldConfiguration?: Record<string, FieldConfiguration>;
    customServiceFactory?: {
        fieldValidator?: CustomFieldServiceFactory<FieldValidator>;
        formValidator?: CustomServiceFactory<FormValidator>;
        changeHandler?: CustomFieldServiceFactory<ChangeHandler>;
        fileChangeHandler?: CustomFieldServiceFactory<ChangeHandler>;
        arrayFieldChangeHandler?: CustomFieldServiceFactory<ArrayFieldChangeHandler>;
        submitService?: CustomServiceFactory<SubmitService>;
        fileUploader?: CustomServiceFactory<FileUploader>;
        dataCollector?: CustomServiceFactory<DataCollector>;
    };
}
