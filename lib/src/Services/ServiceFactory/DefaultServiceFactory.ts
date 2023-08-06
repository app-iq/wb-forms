import {PropsWithChildren} from 'react';
import {DispatchFunction} from 'wb-core-provider';
import {FieldState, State} from '../../Data/State';
import {FormProps} from '../../Form/FormProps';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {DefaultChangeHandler} from '../DefaultImplementation/DefaultChangeHandler';
import {FieldValidator} from '../Protocol/FieldValidator';
import {RegexBasedFieldValidator} from '../DefaultImplementation/RegexBasedFieldValidator';
import {SubmitService} from '../Protocol/SubmitService';
import {DefaultHttpSubmitService} from '../DefaultImplementation/DefaultHttpSubmitService';
import {ServiceFactory} from './ServiceFactory';
import {FieldConfiguration} from '../../Field/FieldProps';
import {ValueSelector} from '../../Field/ValueSelector';
import {FormValidator} from '../Protocol/FormValidator';
import {DefaultFormValidator} from '../DefaultImplementation/DefaultFormValidator';
import {FileUploader, UploadOptions} from '../Protocol/FileUploader';
import {DefaultFileChangeHandler} from '../DefaultImplementation/DefaultFileChangeHandler';
import {DefaultFileUploader} from '../DefaultImplementation/DefaultFileUploader';
import {ArrayFieldChangeHandler} from '../Protocol/ArrayFieldChangeHandler';
import {DefaultArrayFieldChangeHandler} from '../DefaultImplementation/DefaultArrayFieldChangeHandler';
import {DataCollector} from '../Protocol/DataCollector';
import {DataCollectorOptions, DefaultDataCollector} from '../DefaultImplementation/DefaultDataCollector';

export class DefaultServiceFactory implements ServiceFactory {
    public static readonly DATA_COLLECTOR_SERVICE_OPTION_KEY = 'collector';

    constructor(
        protected readonly state: State,
        protected readonly dispatch: DispatchFunction,
        protected readonly formProps: PropsWithChildren<FormProps>,
    ) {
        this.state = state;
        this.dispatch = dispatch;
        this.formProps = formProps;
    }

    createChangeHandler(fieldName: string, defaultValueSelector?: ValueSelector): ChangeHandler {
        if (this.formProps.customServiceFactory?.changeHandler) {
            return this.formProps.customServiceFactory.changeHandler(this.state, this.dispatch, this.formProps, this);
        }

        const fieldConfiguration = this.getFieldConfiguration(fieldName);
        if (fieldConfiguration?.changeHandler) {
            return fieldConfiguration.changeHandler(this.dispatch, this.state, this) as ChangeHandler;
        }

        return new DefaultChangeHandler(
            this.dispatch,
            fieldName,
            this.createFieldValidator(fieldName),
            fieldConfiguration ?? {},
            defaultValueSelector,
        );
    }

    createFileChangeHandler(
        fieldName: string,
        uploadOptions?: UploadOptions,
        defaultValueSelector?: ValueSelector,
    ): ChangeHandler {
        if (this.formProps.customServiceFactory?.fileChangeHandler) {
            return this.formProps.customServiceFactory.fileChangeHandler(
                this.state,
                this.dispatch,
                this.formProps,
                this,
            );
        }

        const fieldConfiguration = this.getFieldConfiguration(fieldName);
        if (fieldConfiguration?.changeHandler) {
            return fieldConfiguration.changeHandler(this.dispatch, this.state, this) as ChangeHandler;
        }

        return new DefaultFileChangeHandler(
            this.dispatch,
            fieldName,
            this.createFieldValidator(fieldName),
            this.createFileUploader(),
            fieldConfiguration ?? {},
            uploadOptions,
            defaultValueSelector,
        );
    }

    createFieldValidator(fieldName: string): FieldValidator {
        if (this.formProps.customServiceFactory?.fieldValidator) {
            return this.formProps.customServiceFactory.fieldValidator(this.state, this.dispatch, this.formProps, this);
        }

        const fieldConfiguration = this.getFieldConfiguration(fieldName);
        if (fieldConfiguration?.fieldValidator) {
            return fieldConfiguration.fieldValidator(this.dispatch, this.state, this);
        }

        return new RegexBasedFieldValidator();
    }

    createSubmitService(): SubmitService {
        if (this.formProps.customServiceFactory?.submitService) {
            return this.formProps.customServiceFactory.submitService(this.state, this.dispatch, this.formProps, this);
        }

        return new DefaultHttpSubmitService(
            this.dispatch,
            this.state,
            this.formProps.serviceOptions ?? {},
            this.createDataCollectorService(),
            this.formProps.fieldConfiguration ?? {},
        );
    }

    createFileUploader(): FileUploader {
        if (this.formProps.customServiceFactory?.fileUploader) {
            return this.formProps.customServiceFactory.fileUploader(this.state, this.dispatch, this.formProps, this);
        }

        return new DefaultFileUploader();
    }

    getFieldConfiguration(fieldName: string): FieldConfiguration | undefined {
        return this.formProps.fieldConfiguration?.[fieldName];
    }

    createFormValidator(): FormValidator {
        if (this.formProps.customServiceFactory?.formValidator) {
            return this.formProps.customServiceFactory.formValidator(this.state, this.dispatch, this.formProps, this);
        }

        return new DefaultFormValidator(this.state.fields, this, this.dispatch);
    }

    createArrayFieldChangeHandler(fieldName: string, fieldState: FieldState): ArrayFieldChangeHandler {
        if (this.formProps.customServiceFactory?.arrayFieldChangeHandler) {
            return this.formProps.customServiceFactory.arrayFieldChangeHandler(
                this.state,
                this.dispatch,
                this.formProps,
                this,
            );
        }

        const fieldConfiguration = this.getFieldConfiguration(fieldName);
        if (fieldConfiguration?.changeHandler) {
            return fieldConfiguration.changeHandler(this.dispatch, this.state, this) as ArrayFieldChangeHandler;
        }
        return new DefaultArrayFieldChangeHandler(
            fieldName,
            fieldState,
            this.dispatch,
            this.createFieldValidator(fieldName),
            fieldConfiguration ?? {},
        );
    }

    createDataCollectorService(): DataCollector {
        if (this.formProps.customServiceFactory?.dataCollector) {
            return this.formProps.customServiceFactory.dataCollector(this.state, this.dispatch, this.formProps, this);
        }

        const options = (this.formProps.serviceOptions?.[DefaultServiceFactory.DATA_COLLECTOR_SERVICE_OPTION_KEY] ??
            {}) as DataCollectorOptions;
        return new DefaultDataCollector(this.state, options);
    }
}
